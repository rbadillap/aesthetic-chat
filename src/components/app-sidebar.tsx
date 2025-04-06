"use client"

import { useState } from "react"
import { Home, MessageSquare, Settings, Info, User, Github, Sparkles, Star, Clock, Heart, Bookmark } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInput,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar"

// Sample conversation data
const favoriteConversations = [
  { id: 1, title: "AI Ethics Discussion", date: "2 days ago", icon: Heart },
  { id: 2, title: "Project Planning", date: "1 week ago", icon: Star },
  { id: 3, title: "Research Summary", date: "2 weeks ago", icon: Bookmark },
]

const recentConversations = [
  { id: 4, title: "Travel Recommendations", date: "3 hours ago" },
  { id: 5, title: "Code Review Help", date: "Yesterday" },
  { id: 6, title: "Book Suggestions", date: "3 days ago" },
  { id: 7, title: "Recipe Ideas", date: "5 days ago" },
  { id: 8, title: "Workout Plan", date: "1 week ago" },
  { id: 9, title: "Language Learning Tips", date: "2 weeks ago" },
]

export function AppSidebar() {
  const [searchQuery, setSearchQuery] = useState("")

  // Filter conversations based on search query
  const filteredFavorites = favoriteConversations.filter((convo) =>
    convo.title.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const filteredRecent = recentConversations.filter((convo) =>
    convo.title.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <Sidebar
      variant="floating"
      collapsible="offcanvas"
      className="border-r border-white/[0.03] text-[0.9375rem] antialiased"
    >
      <SidebarHeader className="pb-2">
        <div className="flex items-center px-3 py-2">
          <Sparkles className="h-5 w-5 mr-2" />
          <span className="text-base font-medium text-gradient">aesthetic.chat</span>
        </div>
        <div className="px-3 pt-1">
          <SidebarInput
            placeholder="Search conversations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-black border-white/5 focus:border-white/10 text-sm"
          />
        </div>
      </SidebarHeader>
      <SidebarSeparator className="bg-white/5" />
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-sm">Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive tooltip="Home" className="text-sm">
                  <a href="/">
                    <Home className="h-4 w-4" />
                    <span>Home</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="New Chat" className="text-sm">
                  <a href="/new">
                    <MessageSquare className="h-4 w-4" />
                    <span>New Chat</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="text-sm">Favorites</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {filteredFavorites.length > 0 ? (
                filteredFavorites.map((convo) => (
                  <SidebarMenuItem key={convo.id}>
                    <SidebarMenuButton asChild tooltip={convo.title} className="text-sm">
                      <a href={`/chat/${convo.id}`}>
                        <convo.icon className="h-4 w-4" />
                        <span className="flex-1 truncate">{convo.title}</span>
                        <span className="text-xs text-gray-500">{convo.date}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))
              ) : searchQuery ? (
                <div className="px-2 py-1 text-sm text-gray-500">No favorites found</div>
              ) : null}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="text-sm">Recent Conversations</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {filteredRecent.length > 0 ? (
                filteredRecent.map((convo) => (
                  <SidebarMenuItem key={convo.id}>
                    <SidebarMenuButton asChild tooltip={convo.title} className="text-sm">
                      <a href={`/chat/${convo.id}`}>
                        <Clock className="h-4 w-4" />
                        <span className="flex-1 truncate">{convo.title}</span>
                        <span className="text-xs text-gray-500">{convo.date}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))
              ) : searchQuery ? (
                <div className="px-2 py-1 text-sm text-gray-500">No conversations found</div>
              ) : null}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="text-sm">Settings</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Settings" className="text-sm">
                  <a href="/settings">
                    <Settings className="h-4 w-4" />
                    <span>Settings</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Profile" className="text-sm">
                  <a href="/profile">
                    <User className="h-4 w-4" />
                    <span>Profile</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarSeparator className="bg-white/5" />
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="About" className="text-sm">
              <a href="/about">
                <Info className="h-4 w-4" />
                <span>About</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="GitHub" className="text-sm">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                <Github className="h-4 w-4" />
                <span>GitHub</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}

