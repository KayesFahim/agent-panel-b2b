import Swal from "sweetalert2";
import axios from "axios";

const handleDeleteClick = (id, setIsLoading, token, refetch, setRefetch) => {
  // Display confirmation dialog

  Swal.fire({
    title: "Are you sure?",
    text: "You will not be able to recover this item!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.isConfirmed) {
      setIsLoading(true);
      const url = `${import.meta.env.REACT_APP_API_URL}/groupfare/${id}`;

      axios
        .delete(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          Swal.fire("Deleted!", "Your item has been deleted.", "success");
        })
        .catch((error) => {
          Swal.fire("Failed!", `${error?.message}`, "error");
        })
        .finally(() => {
          setIsLoading(false);
          setRefetch(!refetch);
        });
    }
  });
};

export default handleDeleteClick;
