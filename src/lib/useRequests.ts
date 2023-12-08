import { useQuery } from "@tanstack/react-query";
import { TOKEN } from "@/app/config";

export default function useRequests(
  key: string,
  url: string,
  returnJSON: boolean = false,
  auth: boolean = true
) : any {
  if (auth) {
    const params = {
      headers: {
        "Authorization": TOKEN
      }
    }
  }
  const { isPending, error, data } = useQuery({
    queryKey: [key],
    queryFn: () =>
      fetch(
        url,
        ).then(
        (res) => {
          if (returnJSON) {
            return res.json();
          } else {
            return res.text();
          }
        }
      ),
  });
  if (!isPending && !error) {
    return data;
  }
}