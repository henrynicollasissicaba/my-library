import Swal from 'sweetalert2'

interface CustomAlertProps {
    title: string
    confirmButtonText: string
}

export const showCustomAlert = async (params: CustomAlertProps) => {
    const result = await Swal.fire({
        title: `${params.title}`,
        text: "Essa é uma ação irreversível!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: `${params.confirmButtonText}`
    });

    if(result.isConfirmed) return true

    return false
}