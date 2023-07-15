const arr: [string, number] = ['a', 1];
const arrRest: [string, number, ...boolean[]] = [
  'a',
  1,
  true,
  false,
];

const skill: readonly [number, string] = [1, 'Dev'];
// const skills: readonly string[] = ['DevOps', 'Dev'];
// or
const skills: ReadonlyArray<string> = ['DevOps', 'Dev'];
enum StatusCode {
  draft = 'draft',
  published = 'published',
  deleted = 'deleted',
}

const enum Roles {
  ADMIN = 'admin',
  USER = 'user',
}

const user = Roles.USER;

type RequestFaqs = {
  topicId: number;
  status?: StatusCode;
};

type ResponseFaqs = {
  question: string;
  answer: string;
  tags: string[];
  likes: number;
  status: StatusCode;
};

async function getFaqs(
  req: RequestFaqs,
): Promise<ResponseFaqs[]> {
  const res = await fetch('/faqs', {
    method: 'POST',
    body: JSON.stringify(req),
  });
  const data = await res.json();
  return data;
}

const a = getFaqs({
  topicId: 1,
  status: StatusCode.published,
});

a.then((res) => console.log(res[0].status));