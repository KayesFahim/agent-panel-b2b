import Swal from 'sweetalert2';
import axios from 'axios';

const handlePatch = (
  id,
  body,
  setIsLoading,
  token,
  refetch,
  setRefetch,
  api,
  text
) => {
  // Display confirmation dialog
  Swal.fire({
    title: 'Are you sure?',
    text: `You want to changes this ${text || ''}!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, Update it!',
  }).then((result) => {
    if (result.isConfirmed) {
      setIsLoading(true);
      const url = api;

      axios
        .patch(url, body, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          Swal.fire(
            'Update!',
            'Your PNR and time limit has been updated.',
            'success'
          );
        })
        .catch((error) => {
          Swal.fire('Failed!', '${error?.message}`, 'error');
        })
        .finally(() => {
          setIsLoading(false);
          setRefetch(!refetch);
        });
    }
  });
};

export default handlePatch;
