

export const getInitials = (name:string) => {
    const initials =  name.split(/\s+/).map((item) => item[0]).join('').toUpperCase();
    return initials;
}