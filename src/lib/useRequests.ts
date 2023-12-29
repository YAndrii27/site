import { useQuery } from '@tanstack/react-query';
import { TOKEN } from '@/app/config';

export default function useRequests(
  key: string,
  url: string,
  returnJSON: boolean = false,
  auth: boolean = true,
) : any {
  const headers = new Headers();
  if (auth) {
    headers.append('Authorization', `Bearer ${TOKEN}`);
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
        if (returnJSON) {
          return res.json();
        }
        return res.text();
      },
    ),
  });
  if (!isPending && !error) {
    return data;
  }
  return '';
}
