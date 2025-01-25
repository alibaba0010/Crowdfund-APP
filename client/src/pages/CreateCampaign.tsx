import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CustomButton, FormField, Loader } from "../components";

const formSchema = z.object({
  name: z.string(),
  title: z.string(),
  description: z
    .string()
    .min(8, "Description must be at least 8 characters long!")
    .max(100, "Description must be less than 100 characters"),
  targetAmount: z.number(),
  deadline: z.date(), // z.coerce.date()
});
type CreateCampaignSchema = z.infer<typeof formSchema>;
const CreateCampaign = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<CreateCampaignSchema>({
    resolver: zodResolver(formSchema),
  });
  const onSubmitHandler = async (data: CreateCampaignSchema) => {
    console.log("Data saved", data);

    setIsLoading(false);
    reset();
    navigate("/");
  };
  return (
    <div className="bg-[#1c1c24] flex justify-center items-center flex-col rounded-[10px] sm:p-10 p-4">
      {isLoading && <Loader />}
      <div className="flex justify-center items-center p-[16px] sm:min-w-[380px] bg-[#3a3a43] rounded-[10px]">
        <h1 className="font-epilogue font-bold sm:text-[25px] text-[18px] leading-[38px] text-white">
          Create a Campaign
        </h1>
      </div>
      <form
        onSubmit={handleSubmit(onSubmitHandler)}
        className="w-full mt-[65px] flex flex-col gap-[30px]"
      >
        <div className="flex flex-wrap gap-[40px]">
          <FormField
            {...register("name")}
            labelName="Your Name *"
            placeholder="John Doe"
            inputType="text"
          />
          {errors.name && (
            <span className="text-red-500 block mt-1">
              {`${errors.name.message}`}
            </span>
          )}
          <FormField
            {...register("title")}
            labelName="Campaign Title *"
            placeholder="Add the campaign title"
            inputType="text"
          />
          {errors.title && (
            <span className="text-red-500 block mt-1">
              {`${errors.title.message}`}
            </span>
          )}
        </div>
        <FormField
          {...register("description")}
          labelName="Description *"
          placeholder="State what the crowdfunding ig going to acheive"
          isTextArea
        />
        {errors.description && (
          <span className="text-red-500 block mt-1">
            {`${errors.description.message}`}
          </span>
        )}
        <div className="flex flex-wrap gap-[40px]">
          <FormField
            {...register("targetAmount")}
            labelName="Target Amount *"
            placeholder="0.50 ETN"
            inputType="text"
          />
          {errors.targetAmount && (
            <span className="text-red-500 block mt-1">
              {`${errors.targetAmount.message}`}
            </span>
          )}
          <FormField
            {...register("deadline")}
            labelName="End Date *"
            placeholder="End Date"
            inputType="date"
          />
          {errors.deadline && (
            <span className="text-red-500 block mt-1">
              {`${errors.deadline.message}`}
            </span>
          )}
        </div>
        <div className="flex justify-center items-center mt-[40px]">
          <CustomButton
            btnType="submit"
            title="Submit new campaign"
            styles="bg-[#1dc071]"
            disabled={isSubmitting}
          />
        </div>
      </form>
    </div>
  );
};

export default CreateCampaign;
