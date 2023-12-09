import { useQuery } from "@tanstack/react-query";
// import { TOKEN } from "@/app/config";

export default function useRequests(
  key: string,
  url: string,
  returnJSON: boolean = false,
  auth: boolean = true
) : any {
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