export interface User {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  created_at: string;
  updated_at: string;
}



export interface UserContextType {
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
  setStories: (storyData: StoryPreview[]) => void;

}

export interface StoryPreview {
  id: number,
  title: string,
  summary: string,
  name: string
  tags: Tags[]

}


export interface Tags {
  tag_name: string,
  tag_type: string
}