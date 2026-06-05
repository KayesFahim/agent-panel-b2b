import Swal from 'sweetalert2';
import axios from 'axios';

const handlePost = (
  id,
  body,
  setIsLoading,
  token,
  refetch,
  setRefetch,
  api,
  text,
  res,
  navigate
) => {
  // Display confirmation dialog
  Swal.fire({
    title: 'Are you sure?',
    text: text,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, Confirm it!',
  }).then((result) => {
    if (result.isConfirmed) {
      setIsLoading(true);
      const url = api;

      axios
        .post(url, body, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          Swal.fire('Update!', res, 'success');
          setRefetch(!refetch);
          if (navigate) {
            navigate(-1);
          }
        })
        .catch((error) => {
          Swal.fire('Failed!', '${error?.message}`, 'error');
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  });
};

export default handlePost;
