import {
  ISearchstaxParsedResult,
  ISearchstaxSearchMetadata,
} from "@searchstax-inc/searchstudio-ux-js";

export function noResultTemplate(
  searchTerm: string,
  metaData: ISearchstaxSearchMetadata | null,
  executeSearch: (searchTerm: string) => void
): React.ReactElement {
  return (
    <div>
      <div className="searchstax-no-results">
        {" "}
        Showing <strong>no results</strong> for <strong>"{searchTerm}"</strong>
        <br />
        {metaData?.spellingSuggestion && (
          <span>
            &nbsp;Did you mean{" "}
            <a
              href="#"
              className="searchstax-suggestion-term"
              onClick={(e) => {
                e.preventDefault();
                executeSearch(metaData?.spellingSuggestion);
              }}
            >
              {metaData?.spellingSuggestion}
            </a>
            ?
          </span>
        )}
      </div>
      <ul>
        <li>
          {" "}
          Try searching for search related terms or topics. We offer a wide
          variety of content to help you get the information you need.{" "}
        </li>
        <li>Lost? Click on the ‘X” in the Search Box to reset your search.</li>
      </ul>
    </div>
  );
}

export function resultsTemplate(
  searchResults: ISearchstaxParsedResult[],
  resultClicked: (
    results: ISearchstaxParsedResult,
    event: any
  ) => ISearchstaxParsedResult[]
): React.ReactElement {
  return (
    <>
      {searchResults && searchResults.length > 0 && (
        <div className="searchstax-results-container" aria-live="polite">
          {searchResults.map((searchResult) => (
            <a
              href={searchResult.url ?? "#"}
              onClick={(event) => resultClicked(searchResult, event)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  resultClicked(searchResult, e);
                }
              }}
              data-searchstax-unique-result-id={searchResult.uniqueId}
              key={searchResult.uniqueId}
              className="searchstax-result-item"
              tabIndex={0}
            >
              <div
                className={`searchstax-result-content ${
                  searchResult.thumbnail ? "with-thumbnail" : ""
                }`}
              >
                {searchResult.promoted && (
                  <div className="searchstax-result-promoted">Promoted</div>
                )}

                {searchResult.thumbnail && (
                  <img
                    src={searchResult.thumbnail}
                    alt={searchResult.title || undefined}
                    className="searchstax-thumbnail"
                  />
                )}

                <div className="searchstax-result-details">
                  <h3 className="searchstax-result-title">
                    {searchResult.title}
                  </h3>

                  {searchResult.paths && (
                    <p className="searchstax-result-paths">
                      {searchResult.paths}
                    </p>
                  )}

                  {searchResult.description && (
                    <p className="searchstax-result-description">
                      {searchResult.description}
                    </p>
                  )}

                  {searchResult.unmappedFields.map((unmappedField) => (
                    <div
                      key={unmappedField.key}
                      className="searchstax-result-unmapped"
                    >
                      {unmappedField.isImage &&
                      typeof unmappedField.value === "string" ? (
                        <img
                          src={unmappedField.value}
                          alt="Unmapped"
                          className="searchstax-result-image"
                        />
                      ) : (
                        <p>{unmappedField.value}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </a>
          ))}
        </div>
      )}
    </>
  );
}

// Grid view template with smaller cards
export function gridResultsTemplate(
  searchResults: ISearchstaxParsedResult[],
  resultClicked: (
    results: ISearchstaxParsedResult,
    event: any
  ) => ISearchstaxParsedResult[]
): React.ReactElement {
  return (
    <>
      {searchResults && searchResults.length > 0 && (
        <div className="searchstax-results-grid-container" aria-live="polite">
          {searchResults.map((searchResult) => (
            <a
              href={searchResult.url ?? "#"}
              onClick={(event) => resultClicked(searchResult, event)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  resultClicked(searchResult, e);
                }
              }}
              data-searchstax-unique-result-id={searchResult.uniqueId}
              key={searchResult.uniqueId}
              className="searchstax-grid-result-item"
              tabIndex={0}
            >
              <div className="searchstax-grid-result-content">
                {searchResult.thumbnail && (
                  <img
                    src={searchResult.thumbnail}
                    alt={searchResult.title || undefined}
                    className="searchstax-grid-thumbnail"
                  />
                )}

                <div className="searchstax-grid-result-details">
                  <h3 className="searchstax-grid-result-title">
                    {searchResult.title}
                  </h3>
                  {searchResult.paths && (
                    <p className="searchstax-grid-result-paths">
                      {searchResult.paths}
                    </p>
                  )}
                  {searchResult.description && (
                    <p className="searchstax-grid-result-description">
                      {searchResult.description}
                    </p>
                  )}
                </div>
              </div>
            </a>
          ))}
        </div>
      )}
    </>
  );
}
