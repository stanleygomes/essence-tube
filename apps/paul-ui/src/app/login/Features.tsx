import React from "react";

export default function Features() {
  return (
    <div className="flex w-full py-12 flex-col items-center justify-center">
      <div className="mx-auto w-container max-w-full py-16 lg:py-[100px]">
        <h2 className="text-4xl font-bold mb-6 text-center">
          Lorem ipsum dolor sit amet
        </h2>

        <div className="w-full mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-0 border-black overflow-hidden my-0!">
          <div className="flex flex-col justify-center p-8 min-h-[220px] border-b-4 border-black md:border-b-0 md:border-r-4 bg-main-light">
            <div className="flex items-center mb-4">
              <span
                id="who-made-this"
                className="text-2xl font-bold text-black"
              >
                Consectetur adipiscing elit
              </span>
            </div>
            <p className="text-lg text-black">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>
          </div>
          <div className="flex flex-col bg-main justify-center p-8 min-h-[220px] border-black">
            <div className="flex items-center mb-4">
              <span id="open-source" className="text-2xl font-bold text-black">
                Duis aute irure dolor
              </span>
            </div>
            <p className="text-lg text-black">
              Duis aute irure dolor in reprehenderit in voluptate velit esse
              cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
              cupidatat non proident, sunt in culpa qui officia deserunt mollit
              anim id est laborum.
            </p>
          </div>
          <div className="flex flex-col bg-main-light lg:bg-main justify-center p-8 min-h-[220px] border-t-4 border-black md:border-b-0 md:border-r-4">
            <div className="flex items-center mb-4">
              <span
                id="what-does-this-do"
                className="text-2xl font-bold text-black"
              >
                Sed ut perspiciatis
              </span>
            </div>
            <p className="text-lg text-black">
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem
              accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
              quae ab illo inventore veritatis et quasi architecto beatae vitae
              dicta sunt explicabo.
            </p>
          </div>
          <div className="flex flex-col justify-center p-8 min-h-[220px] border-t-4 bg-main md:bg-main-light">
            <div className="flex items-center mb-4">
              <span
                id="fair-for-large-group"
                className="text-2xl font-bold text-black"
              >
                Nemo enim ipsam
              </span>
            </div>
            <p className="text-lg text-black">
              Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit
              aut fugit, sed quia consequuntur magni dolores eos qui ratione
              voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem
              ipsum quia dolor sit amet.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
