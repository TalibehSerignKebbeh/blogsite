import format from "date-fns/format";
import isSameHour from "date-fns/isSameHour";
import isSameMinute from "date-fns/isSameMinute";
import isToday from "date-fns/isToday";
import parseISO from "date-fns/parseISO";
import differenceInHours from "date-fns/differenceInHours";
import diffInMinutes from "date-fns/differenceInMinutes";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import isYesterday from "date-fns/isYesterday";
import toDate from "date-fns/toDate";
import parse from "date-fns/esm/parse";
import isValid from "date-fns/isValid";


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
 
export function formatDate(date, formatString) {

    console.log(date);
    if (date && isValid(parseISO(date))) {
        if (isToday(parseISO(date))) {
            if (isSameMinute(parseISO(date), new Date())) {
                return formatDistanceToNow(parseISO(date)) + " ago"
            }
            if (isSameHour(parseISO(date), new Date())) {
                return formatDistanceToNow(parseISO(date))+ " ago"
            }
        return "Today at " + format(parseISO(date), 'kk:mm bbb');

        } 

        if (isYesterday(parseISO(date))) {
             return "Yesterday at " + format(parseISO(date), 'kk : mm bbb');
         }

        return format(parseISO(date), 'do MMM, yyyy HH:mm aa');
    }

    return 'invalid date recieve'
}



export const GetFullName =(user)=> user?.firstName +' '+user?.lastName

const usernameRegex = /^[a-zA-Z0-9_-]{5,16}$/;

export const validateUsername = (value)=> usernameRegex.test(value)