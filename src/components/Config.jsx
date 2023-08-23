import format from "date-fns/format";
import parseISO from "date-fns/parseISO";


export const GetError = (err) => {
    if (!err?.response) {
        return 'No server response';
    }
    if (err?.response?.status === 500) {
        return "An internal server error occurred";
    }
    if (err?.response?.status === 413 ) {
        return "Request entity is too large ";
    }
     if (err?.response?.status === 400 ) {
        return err?.response?.data?.message;
    }
    
    if (err?.response?.data?.errors?.length) return err?.response?.data?.errors
    return err?.response?.data?.message

}

export const formattedTitle = (title) => `${title?.toLowerCase()?.split(' ')?.join('-')}`
 
export const formatDate = (date, formatString) => date?.length? format(parseISO(date), formatString || 'MMM do, yyyy') : ''

export const GetFullName =(user)=> user?.firstName +' '+user?.lastName
