import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "@workspace/ui/components/toast";
import { Button } from "@workspace/ui/components/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@workspace/ui/components/form";
import { Input } from "@workspace/ui/components/input";
import { Separator } from "@workspace/ui/components/separator";
import { Textarea } from "@workspace/ui/components/textarea";
import { Doc } from "@workspace/backend/_generated/dataModel";
import { useMutation } from "convex/react";
import { api } from "@workspace/backend/_generated/api";
import { VapiFormFields } from "./vapi-form-fields";
import { FormSchema } from "../../types";
import { widgetSettingsSchema } from "../../schemas";
import { Loader2, MessageSquareText, PhoneCall, Sparkles } from "lucide-react";
import { Badge } from "@workspace/ui/components/badge";

type WidgetSettings = Doc<"widgetSettings">;

interface CustomizationFormProps {
  initialData?: WidgetSettings | null;
  hasVapiPlugin: boolean;
}

export const CustomizationForm = ({
  initialData,
  hasVapiPlugin,
}: CustomizationFormProps) => {
  const upsertWidgetSettings = useMutation(api.private.widgetSettings.upsert);

  const form = useForm<FormSchema>({
    resolver: zodResolver(widgetSettingsSchema),
    defaultValues: {
      greetMessage:
        initialData?.greetMessage || "Hi! How can I help you today?",
      defaultSuggestions: {
        suggestion1: initialData?.defaultSuggestions.suggestion1 || "",
        suggestion2: initialData?.defaultSuggestions.suggestion2 || "",
        suggestion3: initialData?.defaultSuggestions.suggestion3 || "",
      },
      vapiSettings: {
        assistantId: initialData?.vapiSettings.assistantId || "",
        phoneNumber: initialData?.vapiSettings.phoneNumber || "",
      },
    },
  });

  const onSubmit = async (values: FormSchema) => {
    try {
      const vapiSettings: WidgetSettings["vapiSettings"] = {
        assistantId:
          values.vapiSettings.assistantId === "none"
            ? ""
            : values.vapiSettings.assistantId,
        phoneNumber:
          values.vapiSettings.phoneNumber === "none"
            ? ""
            : values.vapiSettings.phoneNumber,
      };

      await upsertWidgetSettings({
        greetMessage: values.greetMessage,
        defaultSuggestions: values.defaultSuggestions,
        vapiSettings,
      });

      toast.add({
        type: "success",
        description: "Widget settings saved",
      });
    } catch (error) {
      console.error(error);
      toast.add({
        type: "success",
        description: "Something Went Wrong",
      });
    }
  };

  return (
    <Form {...form}>
      <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
        <Card className="border-muted-foreground/10 shadow-sm">
          <CardHeader>
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
                <MessageSquareText className="h-4.5 w-4.5 text-primary" />
              </div>
              <div>
                <CardTitle>General Chat Settings</CardTitle>
                <CardDescription>
                  Configure basic chat widget behavior and messages
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <FormField
              control={form.control}
              name="greetMessage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Greeting Message</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="Welcome message shown when chat open"
                      rows={3}
                      className="resize-none focus-visible:ring-primary/30"
                    />
                  </FormControl>
                  <FormDescription>
                    The first message customers see when they open the chat
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Separator />

            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-muted-foreground" />
                <h3 className="text-sm font-medium">Default Suggestions</h3>
                <Badge variant="secondary" className="ml-auto font-normal">
                  3 quick replies
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                Quick reply suggestions shown to customers to help guide the
                conversation
              </p>

              <div className="space-y-3 rounded-xl border border-dashed border-muted-foreground/20 bg-muted/30 p-4">
                {(["suggestion1", "suggestion2", "suggestion3"] as const).map(
                  (name, i) => (
                    <FormField
                      key={name}
                      control={form.control}
                      name={`defaultSuggestions.${name}`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center gap-2">
                            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/10 text-[11px] font-medium text-primary">
                              {i + 1}
                            </span>
                            Suggestion {i + 1}
                          </FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder={
                                [
                                  "e.g., How do I get started?",
                                  "e.g., What are your pricing plans?",
                                  "e.g., I need help with my account",
                                ][i]
                              }
                              className="bg-background focus-visible:ring-primary/30"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {hasVapiPlugin && (
          <Card className="border-muted-foreground/10 shadow-sm">
            <CardHeader>
              <div className="flex items-center gap-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
                  <PhoneCall className="h-4.5 w-4.5 text-primary" />
                </div>
                <div>
                  <CardTitle>Voice Assistant Settings</CardTitle>
                  <CardDescription>
                    Configure voice calling features powered by Vapi
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <VapiFormFields form={form} />
            </CardContent>
          </Card>
        )}

        <div className="sticky bottom-0 -mx-1 flex justify-end rounded-2xl border-t bg-background/80 px-1 py-4 backdrop-blur supports-backdrop-filter:bg-background/60">
          <Button
            disabled={form.formState.isSubmitting}
            type="submit"
            className="min-w-32"
          >
            {form.formState.isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              "Save Settings"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};
