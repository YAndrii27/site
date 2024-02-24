import { useQuery } from '@tanstack/react-query';
import { TOKEN } from '@/app/config';

export default function useRequests(
  key: string,
  url: string,
  returnJSON: boolean = false,
  auth: boolean = true,
) : any {
  const headers = new Headers();
  if (auth && TOKEN) {
    headers.set('Authorization', `Bearer ${TOKEN}`);
  }
  const { isPending, error, data } = useQuery({
    queryKey: [key],
    queryFn: () => fetch(
      url,
      {
        headers,
      },
    ).then(
      (res) => {
        if (res.ok) {
          return returnJSON ? res.json() : res.text();
        }
        throw new Error('Network response was not ok');
      },
    ),
  });
  if (!isPending && !error) {
    return data;
  }
  return '';
}
