import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CustomButton, FormField, Loader } from "../components";
import { parseEther } from "viem";
import { useWriteContract } from "wagmi";
import { wagmiContractConfig } from "../utils/contract";
import { useWaitForTransactionReceipt } from "wagmi";
import { type ChangeEvent, DragEvent, useEffect, useState } from "react";
import { uploadToPinata } from "../utils";
import { refreshCampaigns } from "../actions/campaigns";
import { useDispatch } from "react-redux";

const validateDate = (date: Date) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Set time to midnight to compare only dates
  return date > today;
};

const formSchema = z.object({
  name: z.string().min(1, "Your Name is required!"),
  title: z
    .string()
    .min(1, "Campaign Title is required!")
    .max(20, "Campaign Title is must not be more than 20 words!"),
  description: z
    .string()
    .min(10, "Description must be at least 8 characters long!")
    .max(250, "Description must be less than 100 characters"),
  targetAmount: z.coerce.number().min(0, "Amount must not be negative"),
  deadline: z.coerce
    .date({ message: "End Date is required!" })
    .refine(
      validateDate,
      "Deadline must be in the future (tomorrow or later)."
    ),
});

type CreateCampaignSchema = z.infer<typeof formSchema>;

const CreateCampaign = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [drag, setDrag] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    data: hash,
    isPending,
    writeContract,
    error: writeError,
  } = useWriteContract();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<CreateCampaignSchema>({
    resolver: zodResolver(formSchema),
  });
  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });

  const handleImageFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedImage(e.target.files[0]);
    }
  };

  const handleDragOver = (e: DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setDrag(true);
  };

  const handleDragLeave = () => {
    setDrag(false);
  };

  const handleImageDrop = (e: DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setDrag(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setSelectedImage(e.dataTransfer.files[0]);
    }
  };

  const uploadImage = async () => {
    if (selectedImage) {
      const { IpfsHash } = await uploadToPinata(selectedImage);
      return `https://ipfs.io/ipfs/${IpfsHash}`;
    } else {
      return `https://ipfs.io/ipfs/QmZZaxkQd2LCWssUmzFygFycSDGW2Zhuw4fP4iX7xWogUm`;
    }
  };
  const onSubmitHandler = async (data: CreateCampaignSchema) => {
    try {
      const { deadline, description, targetAmount, title, name } = data;
      const parsedAmount = parseEther(targetAmount.toString());
      const deadlineTimestamp = Math.floor(deadline.getTime() / 1000);
      const image = await uploadImage();
      writeContract({
        ...wagmiContractConfig,
        functionName: "createCampaign",
        args: [
          name,
          title,
          description,
          parsedAmount,
          image,
          deadlineTimestamp,
        ],
      });
    } catch (error) {
      console.error("Error creating campaign:", error);
    }
  };
  useEffect(() => {
    if (isConfirmed) {
      reset();
      setSelectedImage(null);
      dispatch(refreshCampaigns());

      navigate("/");
    }
  }, [isConfirmed]);

  return (
    <div className="bg-[#1c1c24] flex justify-center items-center flex-col rounded-[10px] sm:p-10 p-4">
      {isPending && <Loader />}
      <div className="flex justify-center items-center p-[16px] sm:min-w-[380px] bg-[#3a3a43] rounded-[10px]">
        <h1 className="font-epilogue font-bold sm:text-[25px] text-[18px] leading-[38px] text-white">
          Create a Campaign
        </h1>
      </div>

      <form
        onSubmit={handleSubmit(onSubmitHandler)}
        className="w-full mt-[65px] flex flex-col gap-[30px]"
      >
        {/* Name Field */}
        <div className="flex flex-col gap-2">
          <FormField
            {...register("name")}
            labelName="Creator's Name *"
            placeholder="John Doe"
            inputType="text"
          />
          {errors.name && (
            <span className="text-red-500 text-sm mt-1">
              {errors.name.message}
            </span>
          )}
        </div>

        {/* Title Field */}
        <div className="flex flex-col gap-2">
          <FormField
            {...register("title")}
            labelName="Campaign Title *"
            placeholder="Add the campaign title"
            inputType="text"
          />
          {errors.title && (
            <span className="text-red-500 text-sm mt-1">
              {errors.title.message}
            </span>
          )}
        </div>

        {/* Description Field */}
        <div className="flex flex-col gap-2">
          <FormField
            {...register("description")}
            labelName="Campaign Description *"
            placeholder="State what the crowdfunding is going to achieve"
            isTextArea
          />
          {errors.description && (
            <span className="text-red-500 text-sm mt-1">
              {errors.description.message}
            </span>
          )}
        </div>

        {/* Target Amount and Deadline Fields */}
        <div className="flex flex-wrap gap-[40px]">
          <div className="flex-1 flex flex-col gap-2">
            <FormField
              {...register("targetAmount", { valueAsNumber: true })}
              labelName="Target Amount *"
              placeholder="0.50 ETN"
              inputType="number"
              step="0.0001"
            />
            {errors.targetAmount && (
              <span className="text-red-500 text-sm mt-1">
                {errors.targetAmount.message}
              </span>
            )}
          </div>

          <div className="flex-1 flex flex-col gap-2">
            <FormField
              {...register("deadline")}
              labelName="End Date *"
              placeholder="End Date"
              inputType="date"
            />
            {errors.deadline && (
              <span className="text-red-500 text-sm mt-1">
                {errors.deadline.message}
              </span>
            )}
          </div>
        </div>
        {/* Image Upload */}
        <div className="flex flex-col gap-2">
          <label className="font-epilogue font-medium text-[14px] leading-[22px] text-[#808191] mb-[10px]">
            Campaign Image (Optional)
          </label>
          <div className="flex justify-center items-center w-full">
            <label
              htmlFor="dropzone-file"
              className={`flex flex-col justify-center items-center w-full h-40 bg-[#1c1c24] rounded-lg border-2 ${
                drag ? "border-[#1dc071]" : "border-gray-300"
              } border-dashed cursor-pointer hover:bg-[#2c2f32] transition-all duration-300 ease-in-out`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleImageDrop}
            >
              <div className="flex flex-col justify-center items-center pt-5 pb-6">
                <svg
                  aria-hidden="true"
                  className="mb-3 w-10 h-10 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  ></path>
                </svg>
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                  <span className="font-semibold">Click to upload</span> or drag
                  and drop
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  PNG, JPG or GIF (MAX. 800x400px)
                </p>
              </div>
              <input
                id="dropzone-file"
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleImageFileChange}
              />
            </label>
          </div>
          {selectedImage && (
            <div className="mt-4 flex items-center space-x-2">
              <img
                src={URL.createObjectURL(selectedImage) || "/placeholder.svg"}
                alt="Selected"
                className="w-16 h-16 object-cover rounded"
              />
              <span className="font-epilogue text-[14px] text-[#808191]">
                {selectedImage.name}
              </span>
            </div>
          )}
        </div>
        {/* Submit Button */}
        <div className="flex justify-center items-center mt-[40px]">
          <CustomButton
            btnType="submit"
            title="Submit new campaign"
            styles="bg-[#1dc071]"
            disabled={isSubmitting || isPending}
          />
        </div>
        {writeError && (
          <span className="text-red-500 text-sm mt-1">
            Error: {writeError.message}
          </span>
        )}

        {isConfirming && (
          <Loader
            text={
              <span className="text-yellow-500 text-sm mt-1">
                Waiting for transaction confirmation...
              </span>
            }
          />
        )}

        {isConfirmed && (
          <Loader
            text={
              <span className="text-green-500 text-sm mt-1">
                Transaction confirmed! Campaign created successfully.
              </span>
            }
            isChecker
          />
        )}
      </form>
    </div>
  );
};

export default CreateCampaign;
