import { useState } from "react";
import {
    CreateAudioMessage,
    CreateAudioStory,
    CreateImageMessage,
    CreateTextStory,
    CreateVideoMessage,
    ICreateCampaignContent,
} from "../../interfaces/campaign.interface";
import { useCreateCampaignContent } from "../../store/campaignStore";

const CampaignContentPreview: React.FC<{
    content: ICreateCampaignContent;
}> = ({ content }) => {
    const { removeContent } = useCreateCampaignContent((state) => state);
    const [contentBgColor, setcontentBgColor] = useState("#000");
    // function to generate hex color code
    const generateHexColor = () => {
        const letters = "0123456789ABCDEF";
        let color = "#";
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    };

    return (
        <div className="relative">
            <div className="absolute px-2 top-2 w-full flex justify-between gap-2">
                <div
                    className=" cursor-pointer shadow-2xl bg-gray-600 text-white h-8 opacity-90 w-8 rounded-full flex justify-center items-center"
                    onClick={() => {
                        removeContent(content.id);
                    }}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        id="Outline"
                        viewBox="0 0 24 24"
                        width="20"
                        height="20"
                    >
                        <g
                            width="100%"
                            height="100%"
                            transform="matrix(1,0,0,1,0,0)"
                        >
                            <path
                                d="M18,6h0a1,1,0,0,0-1.414,0L12,10.586,7.414,6A1,1,0,0,0,6,6H6A1,1,0,0,0,6,7.414L10.586,12,6,16.586A1,1,0,0,0,6,18H6a1,1,0,0,0,1.414,0L12,13.414,16.586,18A1,1,0,0,0,18,18h0a1,1,0,0,0,0-1.414L13.414,12,18,7.414A1,1,0,0,0,18,6Z"
                                fill="#ffffff"
                                fill-opacity="1"
                                data-original-color="#000000ff"
                                stroke="none"
                                stroke-opacity="1"
                            />
                        </g>
                    </svg>
                </div>
                <div className="flex gap-2">
                    {(content.mimetype === "text" ||
                        content.mimetype === "audio") && (
                        <div
                            className=" cursor-pointer shadow-2xl bg-gray-600 text-white h-8 opacity-90 w-8 rounded-full flex justify-center items-center"
                            onClick={() => {
                                setcontentBgColor(generateHexColor());
                            }}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                id="Outline"
                                viewBox="0 0 24 24"
                                width="20"
                                height="20"
                                stroke="#FFFFFF"
                                fill="#FFFFFF"
                            >
                                <g
                                    width="100%"
                                    height="100%"
                                    transform="matrix(1,0,0,1,0,0)"
                                >
                                    <path
                                        d="M17.115,8.05A1.5,1.5,0,1,0,18.95,9.115,1.5,1.5,0,0,0,17.115,8.05Z"
                                        fill="#ffffff"
                                        fill-opacity="1"
                                        data-original-color="#000000ff"
                                        stroke="none"
                                        stroke-opacity="1"
                                    />
                                    <path
                                        d="M12.115,5.05A1.5,1.5,0,1,0,13.95,6.115,1.5,1.5,0,0,0,12.115,5.05Z"
                                        fill="#ffffff"
                                        fill-opacity="1"
                                        data-original-color="#000000ff"
                                        stroke="none"
                                        stroke-opacity="1"
                                    />
                                    <path
                                        d="M7.115,8.05A1.5,1.5,0,1,0,8.95,9.115,1.5,1.5,0,0,0,7.115,8.05Z"
                                        fill="#ffffff"
                                        fill-opacity="1"
                                        data-original-color="#000000ff"
                                        stroke="none"
                                        stroke-opacity="1"
                                    />
                                    <path
                                        d="M7.115,14.05A1.5,1.5,0,1,0,8.95,15.115,1.5,1.5,0,0,0,7.115,14.05Z"
                                        fill="#ffffff"
                                        fill-opacity="1"
                                        data-original-color="#000000ff"
                                        stroke="none"
                                        stroke-opacity="1"
                                    />
                                    <path
                                        d="M12.5.007A12,12,0,0,0,.083,12a12.014,12.014,0,0,0,12,12c.338,0,.67-.022,1-.05a1,1,0,0,0,.916-1l-.032-3.588A3.567,3.567,0,0,1,20.057,16.8l.1.1a1.912,1.912,0,0,0,1.769.521,1.888,1.888,0,0,0,1.377-1.177A11.924,11.924,0,0,0,24.08,11.7,12.155,12.155,0,0,0,12.5.007Zm8.982,15.4-.014-.014a5.567,5.567,0,0,0-9.5,3.985L11.992,22a10,10,0,0,1,.09-20c.117,0,.235,0,.353.006a10.127,10.127,0,0,1,9.645,9.743A9.892,9.892,0,0,1,21.485,15.4Z"
                                        fill="#ffffff"
                                        fill-opacity="1"
                                        data-original-color="#000000ff"
                                        stroke="none"
                                        stroke-opacity="1"
                                    />
                                </g>
                            </svg>
                        </div>
                    )}
                    {content.mimetype === "text" && (
                        <div
                            className=" cursor-pointer shadow-2xl bg-gray-600 text-white h-8 opacity-90 w-8 rounded-full flex justify-center items-center"
                            onClick={() => {
                                setcontentBgColor(generateHexColor());
                            }}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                id="Layer_1"
                                data-name="Layer 1"
                                viewBox="0 0 24 24"
                                width="14"
                                height="14"
                            >
                                <g
                                    width="100%"
                                    height="100%"
                                    transform="matrix(1,0,0,1,0,0)"
                                >
                                    <path
                                        d="M21,0H3c-.553,0-1,.447-1,1s.447,1,1,1H11V23c0,.553,.447,1,1,1s1-.447,1-1V2h8c.553,0,1-.447,1-1s-.447-1-1-1Z"
                                        fill="#ffffff"
                                        fill-opacity="1"
                                        data-original-color="#000000ff"
                                        stroke="none"
                                        stroke-opacity="1"
                                    />
                                </g>
                            </svg>
                        </div>
                    )}
                </div>
            </div>
            {content.mimetype === "image" ? (
                <div className="flex flex-col gap-3">
                    <img
                        src={(content as CreateImageMessage).image}
                        alt={(content as CreateImageMessage).caption}
                        className="w-52 h-72 object-cover rounded-lg"
                    />
                    <textarea
                        rows={3}
                        defaultValue={(content as CreateImageMessage).caption}
                        className="p-2 rounded-lg border border-[#d9d9d9] outline-none resize-none"
                        placeholder="Write caption"
                    />
                </div>
            ) : content.mimetype === "video" ? (
                <div className="flex flex-col gap-3">
                    <video
                        controls
                        controlsList="nofullscreen"
                        playsInline
                        className="w-52 h-72 object-cover rounded-lg text-black"
                    >
                        <source src={(content as CreateVideoMessage).video} />
                    </video>
                    <textarea
                        rows={3}
                        defaultValue={(content as CreateVideoMessage).caption}
                        className="p-2 rounded-lg border border-[#d9d9d9] outline-none resize-none"
                        placeholder="Write caption"
                    />
                </div>
            ) : content.mimetype === "text" ? (
                <div className="flex flex-col gap-3">
                    <div
                        contentEditable={true}
                        autoFocus={true}
                        className="w-52 h-72 rounded-lg flex items-center justify-center text-white p-4 outline-none"
                        style={{
                            backgroundColor:
                                (content as CreateTextStory).backgroundColor ??
                                contentBgColor,
                        }}
                    >
                        {content.text}
                    </div>
                    <textarea
                        rows={3}
                        defaultValue={(content as CreateTextStory).text}
                        className="p-2 rounded-lg border border-[#d9d9d9] outline-none resize-none"
                        placeholder="Write caption"
                    />
                </div>
            ) : content.mimetype === "audio" ? (
                <div className="flex flex-col gap-3">
                    <audio
                        controls
                        controlsList="nofullscreen"
                        playsInline
                        src={
                            (content as CreateAudioMessage | CreateAudioStory)
                                .audio
                        }
                        className="w-52 h-72 rounded-lg flex items-center justify-cente p-4 outline-none"
                        style={{
                            backgroundColor: contentBgColor,
                        }}
                    ></audio>
                </div>
            ) : null}
        </div>
    );
};

export default CampaignContentPreview;
