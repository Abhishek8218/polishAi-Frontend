import React, { useState } from 'react';
import { Plus } from 'lucide-react';

import FrameworkCard from './components/FrameworkCard';
import FrameworkForm from './components/FrameworkForm';
import LockedSlot from './components/LockedSlot';
import UsageBar from './components/UsageBar';
import TipBanners from './components/TipBanners';
import Drawer from '../../../../shared/components/ui/Drawer';
import Button from '../../../../shared/components/ui/Button';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getAllFrameworks, deleteFramework } from './services/frameworks.services';
import { useAuthStore } from '../../../../store/auth';
import { SubscriptionPlan } from '../../../../shared/types/type';
import ConfirmationModal from '../../../../shared/components/ui/ConfirmationModel';
import { useNavigate } from 'react-router-dom';
import { API_ENDPOINTS } from '../../../../services/api/endPoints';
import toast from 'react-hot-toast';

const Frameworks = () => {
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editingFrameworkId, setEditingFrameworkId] = useState<string | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [frameworkToDelete, setFrameworkToDelete] = useState<string | null>(null);

  const user = useAuthStore((state) => state.user);
  const queryClient = useQueryClient();

  const { data: frameworks } = useQuery({
    queryKey: ['frameworks'],
    queryFn: getAllFrameworks,
    staleTime: 5 * 60 * 1000,
  });

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: deleteFramework,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['frameworks'] });
      setShowDeleteModal(false);
      setFrameworkToDelete(null);
    },

    onError: (error) => {
      console.error('Failed to delete framework:', error);
      toast.error('Failed to delete framework');  
    },
  });

  const openDrawer = () => {
    setEditingFrameworkId(null);
    setDrawerOpen(true);
  };

  const openEditDrawer = (id: string) => {
    setEditingFrameworkId(id);
    setDrawerOpen(true);
  };

  const closeDrawer = () => {
    setDrawerOpen(false);
    setEditingFrameworkId(null);
   
  };

  const handleDeleteClick = (id: string) => {
    setFrameworkToDelete(id);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = () => {
    if (frameworkToDelete) {
      deleteMutation.mutate(frameworkToDelete);
    }
  };

  const handleDeleteCancel = () => {
    setShowDeleteModal(false);
    setFrameworkToDelete(null);
  };

  const frameworkSlotsFilled = user?.plan === SubscriptionPlan.FREE && frameworks?.items?.length === 3;

  return (
    <>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start w-full gap-4">
          <div className="flex flex-col gap-0.5">
            <h1 className="text-[28px] font-medium text-on-surface leading-tight">
              My Frameworks
            </h1>
            <p className="text-[14px] text-on-surface-variant">
              Custom writing structures and style guides for your AI assistant.
            </p>
          </div>
          <div className="shrink-0 self-start">
            <Button
              icon={<Plus size={16} />}
              disabled={frameworkSlotsFilled}
              onClick={openDrawer}
            >
              New Framework
            </Button>
          </div>
        </div>

        {/* Usage bar */}
        {user?.plan === SubscriptionPlan.FREE && (
          <UsageBar
            used={frameworks?.items?.length ?? 0}
            total={3}
            onUpgrade={() => console.log('upgrade')}
          />
        )}

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {frameworks?.items?.map((fw) => (
            <FrameworkCard
              key={fw.id}
              framework={fw}
              onUse={(id) => navigate(API_ENDPOINTS.POLISH.CREATE)}
              onEdit={openEditDrawer}
              onDelete={handleDeleteClick}
            />
          ))}

          {frameworkSlotsFilled && <LockedSlot onUpgrade={() => console.log('upgrade')} />}
        </div>

        <TipBanners />
      </div>

      {/* Drawer */}
      <Drawer
        open={drawerOpen}
        onClose={closeDrawer}
        title={editingFrameworkId ? "Edit Framework" : "New Framework"}
      >
        <FrameworkForm
          onCancel={closeDrawer}
          onSuccess={() => {
            toast.success('Framework saved successfully');
            closeDrawer()}}
          frameworkId={editingFrameworkId ?? undefined}
        />
      </Drawer>

      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={showDeleteModal}
        onClose={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
        title="Delete Framework"
        message="Are you sure you want to delete this framework? This action cannot be undone."
        variant="danger"
        confirmText="Yes, Delete"
        cancelText="Cancel"
      />
    </>
  );
};

export default Frameworks;