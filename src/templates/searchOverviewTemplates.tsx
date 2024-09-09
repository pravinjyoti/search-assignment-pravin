import { ISearchstaxSearchFeedbackData } from "@searchstax-inc/searchstudio-ux-js";

export function searchOverviewTemplate(
  searchFeedbackData: null | ISearchstaxSearchFeedbackData,
  onOriginalQueryClick: (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => void
) {
  return (
    <>
      {searchFeedbackData &&
        searchFeedbackData?.searchExecuted &&
        searchFeedbackData?.totalResults > 0 && (
          <div className="searchstax-feedback-container">
            <p className="searchstax-feedback-summary">
              Showing{" "}
              <strong>
                {searchFeedbackData.startResultIndex} -{" "}
                {searchFeedbackData.endResultIndex}
              </strong>{" "}
              of <strong>{searchFeedbackData.totalResults}</strong> results
              {searchFeedbackData.searchTerm != '*' && (
                <span className="searchstax-feedback-query">
                  {" "}
                  for "<strong>{searchFeedbackData.searchTerm}</strong>"{" "}
                </span>
              )}
            </p>
            {searchFeedbackData.autoCorrectedQuery && (
              <div className="searchstax-feedback-correction">
                <span>Search instead for </span>
                <a
                  href="#"
                  onClick={(e) => {
                    onOriginalQueryClick(e);
                  }}
                  className="searchstax-feedback-original-query"
                >
                  {searchFeedbackData.originalQuery}
                </a>
              </div>
            )}
          </div>
        )}
    </>
  );
}
