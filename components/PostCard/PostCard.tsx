import { ReactElement } from "react";

interface PostCard {
  title: string
  content: string
  color: string
}

const PostCard = ({ title, content, color }: PostCard): ReactElement => {
  return (
    <div className={`w-full sm:w-1/2 md:w-1/3 px-2 post-card mb-4`} data-theme={color}>
      <div className={`p-6 pb-20 rounded border shadow h-full relative`}>
        <h4 className={`text-xl mb-1 font-medium`}>{title}</h4>
        <div className="wp-content" dangerouslySetInnerHTML={{ __html: content }} />
      </div>
    </div>
  )
}

export default PostCard
