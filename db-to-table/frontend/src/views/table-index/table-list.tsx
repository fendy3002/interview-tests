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
  SidebarProvider
} from "../../components/ui/sidebar";

export const TableList = observer((props: { tableNames: string[] }) => {
  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>Table List</SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            {props.tableNames.map((tableName, index) => (
              <SidebarMenuItem key={index}>
                <SidebarMenuButton asChild>
                  <a href={'/table/' + tableName}>
                    <span>{tableName}</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter>
          <Button>+ Create Table</Button>
        </SidebarFooter>
      </Sidebar>
    </SidebarProvider>
  );
});
