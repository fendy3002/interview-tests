import { Button } from "@/components/ui/button";
import { observer } from "mobx-react-lite";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from "../../components/ui/sidebar";

export const TableList = observer((props: { tableNames: string[], uploadModal: JSX.Element }) => {
  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>Table List</SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            {props.tableNames.map((tableName, index) => (
              <SidebarMenuItem key={index}>
                <SidebarMenuButton asChild>
                  {/* this can be improved to have the url generated from store */}
                  {/* though I'll leave it as this for now */}
                  <a href={"/table/" + tableName + "/page/1"}>
                    <span>{tableName}</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter>
          {props.uploadModal}
        </SidebarFooter>
      </Sidebar>
    </SidebarProvider>
  );
});
