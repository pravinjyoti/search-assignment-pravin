import { useState } from "react";
import "./App.scss";
import {
  SearchstaxWrapper,
  SearchstaxInputWidget,
  SearchstaxResultWidget,
  SearchstaxPaginationWidget,
  SearchstaxOverviewWidget,
  SearchstaxSortingWidget,
  SearchstaxExternalPromotionsWidget,
  SearchstaxFacetsWidget,
} from "@searchstax-inc/searchstudio-ux-react";
import type {
  ISearchObject,
  ISearchstaxParsedResult,
  ISearchstaxSuggestProps,
  ISearchstaxSuggestResponse,
} from "@searchstax-inc/searchstudio-ux-js";
import { Searchstax } from "@searchstax-inc/searchstudio-ux-js";
//@ts-ignore
import { config, renderConfig } from "./../config.js";
import {
  gridResultsTemplate,
  noResultTemplate,
  resultsTemplate,
} from "./templates/resultsTemplates.js";
import {
  infiniteScrollTemplate,
  paginationTemplate,
} from "./templates/paginationTemplates.js";
import { searchExternalPromotionsTemplate } from "./templates/externalPromotionsTemplates.js";
import {
  facetsTemplateDesktop,
  facetsTemplateMobile,
} from "./templates/facetTemplates.js";
import { searchSortingTemplate } from "./templates/sorting.templates.js";
import { searchOverviewTemplate } from "./templates/searchOverviewTemplates.js";
import { InputTemplate } from "./templates/inputTemplates.js";

function App() {
  const [searchstaxInstance, setSearchstaxInstance] =
    useState<Searchstax | null>(null);
  // const [isGridView, setIsGridView] = useState(false);
  // const [hasSearched, setHasSearched] = useState(false);

  // const toggleView = () => {
  //   setIsGridView((prev) => !prev);
  // };

  function makeId(length: number) {
    let result = "";
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  const sessionId = makeId(25);

  function beforeSearch(props: ISearchObject) {
    const propsCopy = { ...props };
    return propsCopy;
  }

  function afterSearch(results: ISearchstaxParsedResult[]) {
    const copy = [...results];
    // setHasSearched(true);
    return copy;
  }

  function initialized(searchstax: Searchstax) {
    setSearchstaxInstance(searchstax);
  }

  function afterAutosuggest(result: ISearchstaxSuggestResponse) {
    const copy = { ...result };
    return copy;
  }

  function beforeAutosuggest(props: ISearchstaxSuggestProps) {
    const propsCopy = { ...props };
    return propsCopy;
  }

  function afterLinkClick(result: ISearchstaxParsedResult) {
    const resultCopy = { ...result };
    return resultCopy;
  }

  return (
    <>
      <SearchstaxWrapper
        searchURL={config.searchURL}
        suggesterURL={config.suggesterURL}
        trackApiKey={config.trackApiKey}
        searchAuth={config.searchAuth}
        initialized={initialized}
        beforeSearch={beforeSearch}
        afterSearch={afterSearch}
        authType={config.authType}
        sessionId={sessionId}
        analyticsBaseUrl={config.analyticsBaseUrl}
        router={{ enabled: true }}
        language={config.language}
      >
        <div className="searchstax-page-layout-container">
          <SearchstaxInputWidget
            inputTemplate={InputTemplate}
            suggestAfterMinChars={renderConfig.inputWidget.suggestAfterMinChars}
            afterAutosuggest={afterAutosuggest}
            beforeAutosuggest={beforeAutosuggest}
          />
          <div className="search-details-container">
            <SearchstaxOverviewWidget
              searchOverviewTemplate={searchOverviewTemplate}
            />
            <SearchstaxSortingWidget
              searchSortingTemplate={searchSortingTemplate}
            />
          </div>
          {/* <div className="view-toggle-container">
            {hasSearched && (
              <button onClick={toggleView}>
                {isGridView ? "Switch to List View" : "Switch to Grid View"}
              </button>
            )}
          </div> */}

          <div className="searchstax-page-layout-facet-result-container">
            <div className="searchstax-page-layout-facet-container">
              <SearchstaxFacetsWidget
                facetingType={renderConfig.facetsWidget.facetingType}
                itemsPerPageDesktop={
                  renderConfig.facetsWidget.itemsPerPageDesktop
                }
                itemsPerPageMobile={
                  renderConfig.facetsWidget.itemsPerPageMobile
                }
                specificFacets={undefined}
                facetsTemplateDesktop={facetsTemplateDesktop}
                facetsTemplateMobile={facetsTemplateMobile}
              />
            </div>
            <div className="searchstax-page-layout-result-container">
              <SearchstaxExternalPromotionsWidget
                searchExternalPromotionsTemplate={
                  searchExternalPromotionsTemplate
                }
              />
              <SearchstaxResultWidget
                afterLinkClick={afterLinkClick}
                resultsPerPage={renderConfig.resultsWidget.itemsPerPage}
                renderMethod={renderConfig.resultsWidget.renderMethod}
                noResultTemplate={noResultTemplate}
                resultsTemplate={resultsTemplate}
              />
              <SearchstaxPaginationWidget
                infiniteScrollTemplate={infiniteScrollTemplate}
                paginationTemplate={paginationTemplate}
              />
            </div>
          </div>
        </div>
      </SearchstaxWrapper>
    </>
  );
}

export default App;
