import React from "react";
import { FeatureItems } from "../constants";

const Features = () => {
    return (
        <div className="relative mt-20 border-b border-l-neutral-800 min-h-[800px]">
            <div className="text-center">
                <span className="bg-neutral-0 tracking-wide underline text-orange-500 rounded-full h-6 text-4xl font-medium px-2 py-1 mb-20 uppercase">
                    Why to choose?
                </span>
            </div>

            <div className="flex flex-wrap mt-10 lg:mt-15">
                {FeatureItems.map((feature, index) => (
                    <div key={index} className="w-full sm:w-1/2 lg:w-1/3 p-4">
                        <div className="flex flex-col border border-neutral-300 rounded-lg shadow-md p-4 hover:shadow-lg transition-all">
                            <div className="flex mx-4 h-8 w-8 p-2 bg-neutral-300 text-orange-700 justify-center items-center rounded-full mb-3">
                                {feature.icon}
                            </div>
                            <div >
                                <h5 className="mt-1 mb-4 text-lg text-center font-semibold">{feature.text}</h5>
                                <p className="text-sm text-center text-neutral-500">
                                    {feature.description}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Features;