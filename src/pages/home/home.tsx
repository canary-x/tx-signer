import { Button } from "@/components/ui/button";
import { useSignMessage, useAccount } from "wagmi";
import { useAppKit } from "@reown/appkit/react";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export default function Home() {
  const { signMessage, data: signedMessage } = useSignMessage();
  const { address, isConnected } = useAccount();
  const { open } = useAppKit();
  const [data, setData] = useState("");
  // const data = "0x60007bd9493b8a70722e3d34f1060aa261072068ecb15e6a13dfaf58555da806"
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
              <div>User:</div>
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
                <div className="mt-4">Data: </div>
                <div>
                  <Input
                    value={data}
                    onChange={(e) => setData(e.target.value)}
                  />
                </div>
              </div>
              <div className="my-2 mt-4">
                <Button
                  onClick={() =>
                    signMessage({
                      message: data,
                      account: address,
                    })
                  }
                  disabled={data === ""}
                >
                  Sign Message
                </Button>
                <Button
                  onClick={() =>
                    signMessage({
                      message: {
                        raw: data as `0x${string}`,
                      },
                      account: address,
                    })
                  }
                  disabled={!data.startsWith("0x")}
                  className="ml-2"
                >
                  Sign Raw Message
                </Button>
              </div>
              <div className="my-2 mt-4">
                <h1>Signed Message: </h1>
              </div>
              <div className="mt-2">
                <Input value={signedMessage} />
                <Button
                  disabled={!signedMessage}
                  className="mt-2"
                  onClick={() => {
                    navigator.clipboard.writeText(signedMessage as string);
                  }}
                >
                  Copy Signed Message
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
