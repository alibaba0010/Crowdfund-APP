import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader } from "../components";

const formSchema = z.object({
  name: z.string(),
  title: z.string(),
  description: z.string(),
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
  const onSubmit = async (data: CreateCampaignSchema) => {
    setIsLoading(false);
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
        //   onSubmit={onSubmit}
        className="w-full mt-[65px] flex flex-col gap-[30px]"
      ></form>
    </div>
  );
};

export default CreateCampaign;
