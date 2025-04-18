import React, { useEffect, useState } from "react";
import { UseFormRegister, UseFormSetValue } from "react-hook-form";
import { ICampaignFormInput } from "../interfaces/campaign.interface";
import { IContact } from "../interfaces/contact.interface";

interface IContactsProps {
    contacts: IContact[];
    contactsIsLoading: boolean;
    register: UseFormRegister<ICampaignFormInput>;
    setValue: UseFormSetValue<ICampaignFormInput>;
}

type RecipientOption = "myContacts" | "myContactExcept" | "onlyShareWith";

const Contacts: React.FC<IContactsProps> = ({
    contacts,
    contactsIsLoading,
    setValue,
}) => {
    const [recipientOption, setRecipientOption] =
        useState<RecipientOption>("myContacts");
    const [search, setSearch] = useState<string>("");
    const [selectedRecipients, setSelectedRecipients] = useState<string[]>([]);

    useEffect(() => {
        if (contacts.length) {
            const allContactIds = contacts.map((contact) => contact.id);
            setSelectedRecipients(allContactIds);
            setValue("recipients", allContactIds);
        }
    }, [contacts, setValue]);

    const handleRecipientSelection = (id: string) => {
        setSelectedRecipients((prev) => {
            const updated = prev.includes(id)
                ? prev.filter((recipientId) => recipientId !== id)
                : [...prev, id];

            if (recipientOption === "myContactExcept") {
                // For exclude option, we want to send all contacts EXCEPT selected ones
                const excludedIds = contacts
                    .map((contact) => contact.id)
                    .filter((contactId) => !updated.includes(contactId));
                setValue("recipients", excludedIds);
            } else {
                setValue("recipients", updated);
            }
            return updated;
        });
    };

    const handleRecipientOptionChange = (value: RecipientOption) => {
        setRecipientOption(value);
        if (value === "myContacts") {
            const allContactIds = contacts.map((contact) => contact.id);
            setSelectedRecipients(allContactIds);
            setValue("recipients", allContactIds);
        } else {
            setValue("recipients", []);
            setSelectedRecipients([]);
        }
    };

    const filteredContacts = contacts.filter((contact) =>
        contact.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="flex flex-col gap-4 p-2">
            <label htmlFor="status" className="text-lg font-medium">
                Recipients
            </label>
            <>
                {contactsIsLoading ? (
                    "Loading contacts..."
                ) : (
                    <select
                        id="status"
                        className="h-10 outline-none"
                        onChange={(e) =>
                            handleRecipientOptionChange(
                                e.target.value as RecipientOption
                            )
                        }
                    >
                        <option value="myContacts">
                            My contacts ({contacts.length})
                        </option>
                        <option value="myContactExcept">
                            My contacts except (
                            {recipientOption === "myContactExcept"
                                ? selectedRecipients.length
                                : 0}
                            )
                        </option>
                        <option value="onlyShareWith">
                            Only share with (
                            {recipientOption === "onlyShareWith"
                                ? selectedRecipients.length
                                : 0}
                            )
                        </option>
                    </select>
                )}
            </>

            {recipientOption !== "myContacts" && (
                <>
                    <div className="flex items-center gap-2 border-b pb-2">
                        <input
                            type="text"
                            className="w-full h-10 outline-none"
                            placeholder="Search contacts..."
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                    <div className="flex flex-col gap-2 ml-2 h-[200px] overflow-y-auto">
                        {filteredContacts
                            .sort((a, b) => a.name.localeCompare(b.name))
                            .map((recipient) => (
                                <label
                                    key={recipient.id}
                                    className="flex items-center gap-2 cursor-pointer select-none"
                                >
                                    <input
                                        type="checkbox"
                                        value={recipient.id}
                                        checked={selectedRecipients.includes(
                                            recipient.id
                                        )}
                                        onChange={() =>
                                            handleRecipientSelection(
                                                recipient.id
                                            )
                                        }
                                        className="cursor-pointer h-5 w-5 rounded-full"
                                    />
                                    {recipient.name}
                                </label>
                            ))}
                    </div>
                </>
            )}
        </div>
    );
};

export default Contacts;
