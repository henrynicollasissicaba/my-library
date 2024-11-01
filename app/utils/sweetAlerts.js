import Swal from "sweetalert2";

export const successAlert = () => {
  Swal.fire({
    icon: "success",
    title: "Sucesso!",
    text: "Livro cadastrado com sucesso!",
  });
};

export const confirmAlert = async (message, btnText, confirmTitle, confirmText) => {
  const result = await Swal.fire({
    title: `${message}`,
    text: "Esta é uma ação irreversível!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    cancelButtonText: "Cancelar",
    confirmButtonText: `${btnText}`,
  });

  if (result.isConfirmed) {
    await Swal.fire({
      title: `${confirmTitle}`,
      text: `${confirmText}`,
      icon: "success",
    });
    return true;
  }
  return false;
};
