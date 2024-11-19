import { toast } from "@/hooks/use-toast";

import React from "react";

export class ErrorBoundary extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false, errorMessage: "" };
  }

  static getDerivedStateFromError(error: any) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, errorMessage: error.message };
  }
  componentDidCatch(error: any, errorInfo: any) {
    // You can also log the error to an error reporting service    logErrorToMyService(error, errorInfo);
    console.log(error, errorInfo);
    toast({
      title: "An error occurred",
      description: error.message || "Something went wrong. Please try again.",
      variant: "destructive", // Makes the toast red for errors
      duration: 6000, // Toast duration (optional)
    });
  }
  render() {
    if (this.state.hasError) {
      this.props.toast.return(
        <>
          <div style={{ textAlign: "center", marginTop: "50px" }}>
            <h1>Oops! An error occurred.</h1>
            <p>Please try refreshing the page.</p>
          </div>
        </>
      );
    }
    return this.props.children;
  }
}
