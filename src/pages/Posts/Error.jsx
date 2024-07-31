import { useAsyncError } from 'react-router-dom';

export default function PostError() {
    const error = useAsyncError();

    return <p>{error.message}</p>;
}
