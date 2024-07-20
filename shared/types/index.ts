export type Picture = {
    _id: string;
    filename: string;
    length: number;
    chunkSize: number;
    uploadDate: Date;
    md5: string;
    contentType: string;
    postId: string;
  };
  
  export type Comment = {
    linkedPostId: string;
    creatingUserId: string;
    text: string;
    timestamp: Date;
  };
  
  export type Post = {
    creatingUserId: string;
    postId: string;
    text: string;
    picture?: Picture;
    timestamp: Date;
    comments: Comment[];
  };