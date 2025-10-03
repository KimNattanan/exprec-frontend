import { Dispatch, SetStateAction } from "react";

type LinkedTag = {
  id: string;
  prev_id?: string;
  next_id?: string;
  user_id?: string;
};

type TagManagerProps<Tag extends LinkedTag> = {
  getTags: () => Tag[];
  setTags: Dispatch<SetStateAction<Tag[]>>;
  fetchFunc: () => Promise<Tag[] | null>;
  createFunc: (prevId?: string, nextId?: string) => Promise<Tag | null>;
  deleteFunc: (id: string) => Promise<boolean>;
};

export default function useTagManager<Tag extends LinkedTag>({
  getTags,
  setTags,
  fetchFunc,
  createFunc,
  deleteFunc,
}: TagManagerProps<Tag>) {

  const doFetch = async () => {
    const res: Tag[] = (await fetchFunc()) ?? [];
    const arr: Tag[] = [];
    let x = res.find(tag => !tag.prev_id);
    while (x) {
      arr.push({ ...x, user_id: '' });
      if (!x.next_id) break;
      x = res.find(tag => tag.id === (x ? x.next_id : ''));
    }
    setTags(arr);
  };

  const insertTag = async (prevIndex: number, nextIndex: number) => {
    const tags = getTags();

    if (prevIndex == -1 && nextIndex == -1) {
      const lastTag = tags[tags.length - 1];
      const newTag = await createFunc(lastTag?.id, undefined);
      if (!newTag) return;

      const updatedTags: Tag[] = lastTag
        ? [
            ...tags.slice(0, -1),
            { ...lastTag, next_id: newTag.id, user_id: '' },
            { ...newTag, user_id: '' }
          ]
        : [{ ...newTag, user_id: '' }];
      setTags(updatedTags);
      return;
    }

    if (prevIndex != -1) {
      const prevTag = tags[prevIndex];
      const newTag = await createFunc(prevTag.id, prevTag.next_id);
      if (!newTag) return;

      const nextIndex = (prevIndex + 1 == tags.length ? -1 : prevIndex + 1);
      const nextTag = nextIndex !== -1 ? tags[nextIndex] : undefined;

      const updatedPrevTag = { ...prevTag, next_id: newTag.id, user_id: '' };
      const updatedNewTag = { ...newTag, user_id: '' };
      const updatedNextTag = nextTag ? { ...nextTag, prev_id: newTag.id } : undefined;

      const newTags: Tag[] = [
        ...tags.slice(0, prevIndex),
        updatedPrevTag,
        updatedNewTag,
        ...(updatedNextTag ? [updatedNextTag] : []),
        ...(nextIndex !== -1 ? tags.slice(nextIndex + 1) : [])
      ];

      setTags(newTags);
      return;
    }

    if (nextIndex != -1) {
      const nextTag = tags[nextIndex];
      const newTag = await createFunc(nextTag.prev_id, nextTag.id);
      if (!newTag) return;

      const prevIndex = nextIndex - 1;
      const prevTag = prevIndex !== -1 ? tags[prevIndex] : undefined;

      const updatedNextTag = { ...nextTag, prev_id: newTag.id };
      const updatedNewTag = { ...newTag, user_id: '' };
      const updatedPrevTag = prevTag ? { ...prevTag, next_id: newTag.id } : undefined;

      const newTags: Tag[] = [
        ...(prevIndex !== -1 ? tags.slice(0, prevIndex) : []),
        ...(updatedPrevTag ? [updatedPrevTag] : []),
        updatedNewTag,
        updatedNextTag,
        ...(nextIndex + 1 < tags.length ? tags.slice(nextIndex + 1) : [])
      ];

      setTags(newTags);
      return;
    }
  };

  const deleteTag = async (tagIndex: number) => {
    const tags = getTags();
    
    if (tagIndex < 0 || tagIndex >= tags.length) return;
    const tag = tags[tagIndex];

    if(!(await deleteFunc(tag.id))) return;

    const prevTag = tagIndex-1 == -1 ? null : { ...tags[tagIndex-1], next_id: tag.next_id };
    const nextTag = tagIndex+1 == tags.length ? null : { ...tags[tagIndex+1], prev_id: tag.prev_id };

    const newTags: Tag[] = [
      ...(prevTag ? tags.slice(0, tagIndex-1) : []),
      ...(prevTag ? [prevTag] : []),
      ...(nextTag ? [nextTag] : []),
      ...(nextTag ? tags.slice(tagIndex+2) : []),
    ];

    setTags(newTags);
  };

  const insertLastHandler = () => insertTag(-1, -1);
  const insertLeftHandler = (i: number) => () => insertTag(-1, i);
  const insertRightHandler = (i: number) => () => insertTag(i, -1);
  const deleteHandler = (i: number) => () => deleteTag(i);

  return { doFetch, insertLastHandler, insertLeftHandler, insertRightHandler, deleteHandler };
}