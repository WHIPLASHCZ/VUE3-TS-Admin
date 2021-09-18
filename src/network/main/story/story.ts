import type { response } from '../../request';
import $send from "../../index";

interface storyType{
  title:string
  content:string
}

export function sendStoryRequest(story:storyType) {
  return $send.post<response>({
      url:'/story',
      data:story
  });
}
