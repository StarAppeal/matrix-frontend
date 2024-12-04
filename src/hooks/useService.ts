import {useEffect, useState} from 'react';

type AsyncCallback<T> = () => Promise<T>;
const useService = <T>(callback: AsyncCallback<T>): { data: T | undefined; loading: boolean; error: Error | undefined } => {
    const [data, setData] = useState<T>();
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error>();

    useEffect(() => {
        const executeCallback = async () => {
            setLoading(true);
            try {
                const result = await callback();
                setData(result);
            } catch (err) {
                setError(err as Error);
            } finally {
                setLoading(false);
            }
        };

        executeCallback();
    }, [callback]);

    return {data, loading, error};
}

export default useService;
