import { toast } from "@/hooks/use-toast";

export const uiCatch = (handle: () => Promise<void | any>, callerContext?: string) => {
  return handle().catch((error) => {
    console.log("uiCatch.error", error, `[${callerContext}]`);
    toast({
      title: "An error occurred",
      description: error.message || "Something went wrong. Please try again.",
      variant: "destructive", // Makes the toast red for errors
      duration: 6000, // Toast duration (optional)
    });
  });
};
