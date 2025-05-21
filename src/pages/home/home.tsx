import { toast } from "sonner";
import { Button, buttonVariants } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useSignMessage, useAccount } from "wagmi";
import { useAppKit } from "@reown/appkit/react";

export default function Home() {
  const { signMessage, data: signedMessage } = useSignMessage();
  const { address, isConnected } = useAccount();
  const { open } = useAppKit();
  const data = "0xf2e8842a2f256282b3d40379c81d56df074a6a99780ec695c0bb0ff600a7d6f5"
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
