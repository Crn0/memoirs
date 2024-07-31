import { useAsyncError } from 'react-router-dom';

export default function PostError() {
    const error = useAsyncError();
    console.log(error);
    return <p>{error.message}</p>;
}
