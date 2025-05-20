import { toast } from "sonner";
import { Button, buttonVariants } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useSignMessage, useAccount } from "wagmi";
import { useAppKit } from "@reown/appkit/react";

export default function Home() {
  const { signMessage, data: signedMessage } = useSignMessage();
  const { address, isConnected } = useAccount();
  const { open } = useAppKit();
  const data = "0x9a2dc4c4ad5e7da2273154e8e7c1e03cb55ba69070887bd00314ecc8c4774b44"
  return (
    <section className="bg-gray-50">
      {!isConnected && (
        <Button
          onClick={() => {
            open();
          }}
          variant={"secondary"}
          className="mt-4"
        >
          Connect Wallet
        </Button>
      )}

      {isConnected && (
        <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-screen lg:items-center">
          <div className="mx-auto max-w-xl text-center">
            <div className="mt-8 flex-wrap justify-center gap-4">
              <div>
              User:
              </div>
              <div className="my-2">
                
                <Button
                  onClick={() => {
                    open();
                  }}

                >
                  {address}
                </Button>
              </div>
              <div>
                Data: {data}
              </div>
              <div className="my-2">
                <Button
                  onClick={() =>
                    signMessage({
                      message: {
                        raw: data,
                      },
                      account: address,
                    })
                  }
                >
                  Sign Message
                </Button>
              </div>
              <div className="my-2">
                <h1>Signed Message: {signedMessage}</h1>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
