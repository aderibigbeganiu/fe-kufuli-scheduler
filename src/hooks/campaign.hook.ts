import { useMutation, useQuery } from "@tanstack/react-query";
import { createCampaign, getCampaigns } from "../services/campaign.service";
import {
    CampaignStatus,
    ICampaignFormInput,
} from "../interfaces/campaign.interface";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const useGetCampaigns = (filter?: { status: CampaignStatus }) => {
    return useQuery({
        queryKey: ["campaigns", filter],
        queryFn: () => getCampaigns(filter),
    });
};

export const useCreateCampaign = () => {
    const navigate = useNavigate();
    return useMutation({
        mutationKey: ["createCampaign"],
        mutationFn: async (data: ICampaignFormInput) => {
            await createCampaign(data);
        },
        onSuccess: () => {
            // Handle success
            console.log("Campaign created successfully!");
            toast.success("Campaign created successfully!");
            navigate("/campaigns");
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onError: (error: any) => {
            // Handle error
            console.error("Error creating campaign:", error);
            toast.error(
                error?.data?.message ||
                    "Error creating campaign"
            );
        },
    });
};
