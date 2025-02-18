import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";
import Button from "../../components/button";
import CampaignContentPreview from "../../components/campaignContentPreview";
import ContentTypeIcon from "../../components/contentTypeIcon";
import BackIcon from "../../components/icons/backIcon";
import RadioGroup from "../../components/radioGroup/RadioGroup";
import SectionHeader from "../../components/sectionHeader";
import {
    CampaignContentType,
    CreateTextStory,
    ICreateCampaignContent,
} from "../../interfaces/campaign.interface";
import { useCreateCampaignContent } from "../../store/campaignStore";
import CampaignPreviewActions from "../../components/campaignPreviewActions";
import { useCreateCampaign } from "../../hooks/campaign.hook";
import { useCurrentSocialAccount } from "../../store/currentSocialAccountStore";

export interface ICampaignFormInput {
    name: string;
    isEighteenPlus: boolean;
    frequency: string;
    scheduledTime: Date;
    messages: ICreateCampaignContent[];
    recipients: string[];
}

const createCampaignSchema = z
    .object({
        // name: z.string().min(5, ""),
        messages: z.array(
            z.object({
                text: z.string().min(1, "Content cannot be empty."),
                backgroundColor: z.string(),
            })
        ),
        isEighteenPlus: z.boolean().refine((val) => val !== undefined, {
            message: "Please select an option.",
        }),
        frequency: z
            .enum(["ONCE", "DAILY", "WEEKLY", "MONTHLY", "YEARLY", "CUSTOM"])
            .refine((val) => val !== undefined, {
                message: "Please select a frequency.",
            }),
        scheduledTime: z.string().pipe(z.coerce.date())
        // recipients: z.array(z.string()),
    })
    .required();

const CreateCampaign: React.FC = () => {
    const { messages, updateContent } = useCreateCampaignContent(
        (state) => state
    );
    const { currentAccount } = useCurrentSocialAccount();
    const { mutate: createCampaign } = useCreateCampaign();
    const {
        handleSubmit,
        control,
        formState: { errors },
        register,
        setValue,
        getValues,
    } = useForm<ICampaignFormInput>({
        resolver: zodResolver(createCampaignSchema),
    });

    const onSubmit = (data: ICampaignFormInput) => {
        const hardCodedData = {
            name: `My Business Campaign ${Date.now()}`,
            recipients: ["2348148723402", "2349012702791"],
            socialAccountId: currentAccount!.id,
        };

        createCampaign({
            ...data,
            ...hardCodedData,
        });
    };

    return (
        <div>
            <div className="flex items-center gap-3">
                <BackIcon />
                <SectionHeader title="Create Campaign" />
            </div>
            <div className="flex flex-col gap-5">
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="flex flex-col gap-5 pb-5"
                >
                    <div className="flex overflow-auto pb-5">
                        <div className="flex justify-center gap-4 flex-nowrap">
                            {messages.map((content, index) => (
                                <div className="flex flex-col gap-3 relative">
                                    <CampaignPreviewActions
                                        content={content}
                                        setValue={setValue}
                                        index={index}
                                    />
                                    <CampaignContentPreview
                                        key={index}
                                        content={content}
                                        getValues={getValues}
                                    />
                                    <div key={content.id}>
                                        <input
                                            {...register(
                                                `messages.${index}.backgroundColor`
                                            )}
                                            defaultValue={
                                                (content as CreateTextStory)
                                                    .backgroundColor
                                            }
                                            type="color"
                                            placeholder="background"
                                            hidden
                                        />
                                        <textarea
                                            {...register(
                                                `messages.${index}.text`
                                            )}
                                            onChange={(e) => {
                                                updateContent({
                                                    ...(content as CreateTextStory),
                                                    id: content.id,
                                                    text: e.target.value,
                                                });
                                            }}
                                            id={`text-input-${content.id}`}
                                            className="p-2 rounded-lg border border-[#d9d9d9] outline-none resize-none w-full"
                                            placeholder="Type a message..."
                                            rows={3}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="flex justify-center gap-5">
                        {(
                            [
                                "text",
                                "image",
                                "video",
                                "audio",
                            ] as CampaignContentType[]
                        ).map((type, index) => (
                            <ContentTypeIcon key={index} type={type} />
                        ))}
                    </div>
                    <div>
                        <div className="flex items-center gap-4 p-2">
                            <input
                                type="checkbox"
                                {...register("isEighteenPlus")}
                                className="ml-2"
                                id="isEighteenPlus"
                            />
                            <label
                                htmlFor={`isEighteenPlus`}
                                className="cursor-pointer"
                            >
                                {"Is this rated 18+"}
                            </label>

                            {errors.isEighteenPlus && (
                                <p className="text-xs text-red-500">
                                    {errors.isEighteenPlus.message}
                                </p>
                            )}
                        </div>
                    </div>
                    <div>
                        <Controller
                            name="frequency"
                            control={control}
                            render={({ field }) => (
                                <RadioGroup
                                    {...field}
                                    title="Frequency"
                                    options={[
                                        { label: "Once", value: "ONCE" },
                                        { label: "Daily", value: "DAILY" },
                                        { label: "Weekly", value: "WEEKLY" },
                                        { label: "Monthly", value: "MONTHLY" },
                                        { label: "Yearly", value: "YEARLY" },
                                        { label: "Custom", value: "custom" },
                                    ]}
                                />
                            )}
                        />
                        {errors.frequency && (
                            <p className="text-xs text-red-500">
                                {errors.frequency.message}
                            </p>
                        )}
                    </div>
                    <div>
                        <div className="flex flex-col gap-4 p-2">
                            <label
                                htmlFor={`scheduledTime`}
                                className="cursor-pointer"
                            >
                                {"Schedule"}
                            </label>
                            <input
                                type="datetime-local"
                                {...register("scheduledTime")}
                                className="ml-2"
                                id="scheduledTime"
                            />
                            {errors.scheduledTime && (
                                <p className="text-xs text-red-500">
                                    {errors.scheduledTime.message}
                                </p>
                            )}
                        </div>
                    </div>
                    <Button type="submit">Continue</Button>
                </form>
            </div>
        </div>
    );
};

export default CreateCampaign;
