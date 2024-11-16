import {
  Pagination as UIPagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export const Pagination = (props: {
  className?: string;
  totalPage: number;
  currentPage: number;
  linkToPage: (page: number) => string;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
  numberOfPageShown?: number;
  isShowFirstLast?: boolean;
}) => {
  const numberOfPageShown = props.numberOfPageShown ?? 11;
  const maxPrevPageShown = Math.floor((numberOfPageShown - 1) / 2);
  const maxNextPageShown = Math.ceil((numberOfPageShown - 1) / 2);

  let prevPagesShown = Math.min(props.currentPage - 1, maxPrevPageShown);
  let nextPagesShown = Math.min(
    props.totalPage - props.currentPage,
    maxNextPageShown + (maxPrevPageShown - prevPagesShown)
  );
  if (nextPagesShown < maxNextPageShown) {
    prevPagesShown = Math.min(
      props.currentPage - 1,
      maxPrevPageShown + (maxNextPageShown - nextPagesShown)
    );
  }

  const pagesShown: number[] = [];
  let showFirst = false;
  let showLast = false;
  if (props.isShowFirstLast && props.currentPage - prevPagesShown > 1) {
    showFirst = true;
  }
  for (
    let page = props.currentPage - prevPagesShown;
    page <= props.currentPage + nextPagesShown;
    page++
  ) {
    pagesShown.push(page);
  }
  if (
    props.isShowFirstLast &&
    props.currentPage + nextPagesShown < props.totalPage
  ) {
    showLast = true;
  }
  return (
    <UIPagination className={props.className}>
      <PaginationContent>
        {showFirst && (
          <PaginationItem key={1}>
            <PaginationLink
              href={props.linkToPage(1)}
              onClick={props.onClick}
              data-page={1}
              className="bg-slate-200"
            >
              |&lt;
            </PaginationLink>
          </PaginationItem>
        )}
        {pagesShown.map((page) => (
          <PaginationItem key={page}>
            {page === props.currentPage && (
              <PaginationLink className="">{page}</PaginationLink>
            )}
            {page !== props.currentPage && (
              <PaginationLink
                href={props.linkToPage(page)}
                className="bg-slate-200"
                onClick={props.onClick}
                data-page={page}
              >
                {page}
              </PaginationLink>
            )}
          </PaginationItem>
        ))}
        {showLast && (
          <PaginationItem key={props.totalPage}>
            <PaginationLink
              href={props.linkToPage(props.totalPage)}
              onClick={props.onClick}
              data-page={props.totalPage}
              className="bg-slate-200"
            >
              &gt;|
            </PaginationLink>
          </PaginationItem>
        )}
      </PaginationContent>
    </UIPagination>
  );
};
