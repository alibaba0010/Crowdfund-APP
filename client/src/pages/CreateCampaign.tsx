import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CustomButton, FormField, Loader } from "../components";
import { parseEther } from "viem";
import { useWriteContract } from "wagmi";
import { wagmiContractConfig } from "../utils/contract";
import { useWaitForTransactionReceipt } from "wagmi";
import { useEffect } from "react";

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
    .max(100, "Description must be less than 100 characters"),
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
  const navigate = useNavigate();
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

  const onSubmitHandler = async (data: CreateCampaignSchema) => {
    try {
      const { deadline, description, targetAmount, title } = data;
      const parsedAmount = parseEther(targetAmount.toString());
      const deadlineTimestamp = Math.floor(deadline.getTime() / 1000);
      writeContract({
        ...wagmiContractConfig,
        functionName: "createCampaign",
        args: [parsedAmount, deadlineTimestamp, title, description],
        // gas: 3000000,
      });
    } catch (error) {
      console.error("Error creating campaign:", error);
    }
  };
  useEffect(() => {
    if (isConfirmed) {
      reset();
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
