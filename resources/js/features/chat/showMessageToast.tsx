import { toast } from "react-toastify";

type Props = {
    name: string;
    onClick?: () => void;
}

export function showMessageToast({ name, onClick = () => {} }: Props) {
    const toastId = toast(
        <div className="flex items-center gap-2 relative z-999">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center border-2 border-black bg-white font-bold text-black">
                {name.slice(0,1).toUpperCase()}
              </div>

              <div className="min-w-0">
                <h3 className="font-black text-lg text-black leading-none">
                  {name}
                </h3>

                <p className="mt-1 truncate text-sm font-medium">
                  You have a new message from {name}
                </p>
              </div>
            </div>,
            {
              icon: false,
              closeButton: true,
              className: "!shadow-none !p-2",
                hideProgressBar: true,
                onClick: () => {
                    onClick();
                    toast.dismiss(toastId);
                },
            }
    )
}
