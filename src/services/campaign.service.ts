import {
    CampaignStatus,
    ICampaign,
    ICampaignFormInput,
} from "../interfaces/campaign.interface";
import { request } from "../utils/axios-utils";

export const getCampaigns = async ({
    filter,
    pageParam,
}: {
    filter?: {
        status: CampaignStatus;
    };
    pageParam?: number;
}): Promise<ICampaign[]> => {
    console.log(filter);
    const campaigns = await request({
        method: "GET",
        url: `/campaigns/?limit=10&skip=${pageParam || 0}`,
    });
    return campaigns;
};

export const createCampaign = async (data: ICampaignFormInput) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("socialAccountId", data.socialAccountId);
    formData.append("recipients", JSON.stringify(data.recipients));
    formData.append("frequency", data.frequency);
    formData.append("scheduledTime", data.scheduledTime.toISOString());
    formData.append("messages", JSON.stringify(data.messages));
    formData.append("isEighteenPlus", JSON.stringify(data.isEighteenPlus));

    data.messages.forEach((message) => {
        switch (true) {
            case "image" in message.content:
                formData.append(`files`, message.content.image.url);
                break;

            case "video" in message.content:
                formData.append(`files`, message.content.video.url);
                break;

            case "audio" in message.content:
                formData.append(`files`, message.content.audio.url);
                break;

            default:
                break;
        }
    });

    return request({
        method: "POST",
        url: "/campaigns",
        data: formData,
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
};

export const deleteCampaign = async (campaignId: string) => {
    return request({
        method: "DELETE",
        url: `/campaigns/${campaignId}`,
    });
};
