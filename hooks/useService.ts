import {useState, useEffect} from 'react';

type AsyncCallback<T> = () => Promise<T>;

interface ServiceResult<T> {
  data: T | null,
  error: Error | null,
  loading: boolean,
}

const useService = <T>(callback: AsyncCallback<T>): ServiceResult<T> => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

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
