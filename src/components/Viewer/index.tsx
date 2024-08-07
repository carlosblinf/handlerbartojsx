/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import { store, useAppSelector } from "@/store";
import { updateInfo } from "@/store/builder/builderSlice";
import { render } from "./helper";
import useDebounce from "../../utils/debounce";
import { useEffect, useRef } from "react";
import Profile from "./components/Profile";
import Education from "./components/Education";
import Contact from "./components/Contact";
import Employment from "./components/Employment";
import Skills from "./components/Skills";
import { InfoComponent, Page } from "../../utils/types";
import Default from "./components/Default";

type ViewerProps = {
  pages: Page[];
  setPages: (value: React.SetStateAction<Page[]>) => void;
};

const PAGE_HEIGT = 1094;

function Viewer({ pages, setPages }: ViewerProps) {
  const pageRefs = useRef<Array<HTMLDivElement | null>>([]);

  function createNewPage() {
    const newPageId = pages.length + 1;
    setPages((prevPages) => [...prevPages, { id: newPageId, elements: [] }]);
  }

  useEffect(() => {
    adjustPages();
  }, [pages]);

  const adjustPages = () => {
    const updatedPages = [...pages];
    let flag = false;
    const pageDomRefs = [...pageRefs.current];
    let currentPageIndex1 = 0;
    for (let i = 0; i < updatedPages.length; i++) {
      const pageDom = pageDomRefs[i];
      const currentPage = updatedPages[i];

      if (pageDom) {
        const elementosInternosDerecha = pageDom.children[1].children;
        let currentPageHeight = 0;

        for (const elemento of elementosInternosDerecha) {
          currentPageHeight += elemento.scrollHeight;
        }
        console.log("currentPageHeight", currentPageHeight);
        // const currentPageHeight = pageDom.getBoundingClientRect().height;
        // const currentPageHeight1 = pageDom.scrollHeight;
        if (currentPageHeight > PAGE_HEIGT && i + 1 >= updatedPages.length) {
          console.log("si");
          createNewPage();
        }
        while (
          currentPageHeight > PAGE_HEIGT &&
          currentPageIndex1 + 1 < updatedPages.length
        ) {
          currentPageIndex1++;
          console.log("entro");
          const nextPage = updatedPages[i + 1];
          console.log("nextPage", nextPage);
          // // const nextPageDom = pageDomRefs[i + 1];
          console.log("currentPage", currentPage);
          const lastElement = currentPage.elements.pop();
          if (lastElement) {
            console.log("lastElement", lastElement);
            nextPage.elements.unshift(lastElement);
            console.log("nextPage1", nextPage);
            console.log("currentPage1", currentPage);
            flag = true;
          }
        }
        // console.log("currentPageHeight", currentPageHeight);
        // while (currentPageHeight > PAGE_HEIGT ) {
        //   currentPageIndex1--;
        //   console.log("entro");
        //   if (i + 1 < updatedPages.length) {
        //     const nextPage = updatedPages[i + 1];
        //     // Obtener el último elemento de la página anterior y eliminarlo
        //     const lastElement = currentPage.elements.pop();
        //     if (lastElement) {
        //       nextPage.elements.unshift(lastElement);
        //       flag = true;
        //     }
        //   } else {
        //     createNewPage();
        //     const nextPage = updatedPages[i + 1];
        //     // Obtener el último elemento de la página anterior y eliminarlo
        //     const lastElement = currentPage.elements.pop();
        //     if (lastElement) {
        //       nextPage.elements.unshift(lastElement);
        //       flag = true;
        //     }
        //   }
        // }
        // currentPageIndex++
        // currentPageIndex -= 1;
        // const previousPage = updatedPages[currentPageIndex];
        // // Obtener el último elemento de la página anterior y eliminarlo
        // const lastElement = currentPage.elements.pop();
        // if (lastElement) {
        //   previousPage.elements.unshift(lastElement);
        //   flag = true;
        // }
        let currentPageIndex = 0;
        // currentPageHeight1 = pageDom.scrollHeight;
        // while (
        //   currentPageHeight1 <= PAGE_HEIGT &&
        //   currentPageIndex + 1 < updatedPages.length
        // ) {
        //   currentPageIndex++;
        //   const nextPage = updatedPages[i + 1];
        //   const nextPageDom = pageDomRefs[i + 1];
        //   if (nextPageDom) {
        //     const firstElementNextPageDom =
        //       nextPageDom.getElementsByClassName("element")[0];
        //     const firstelemtHeight =
        //       firstElementNextPageDom?.getBoundingClientRect().height;
        //     if (
        //       firstElementNextPageDom &&
        //       firstelemtHeight &&
        //       currentPageHeight1 + firstelemtHeight <= PAGE_HEIGT
        //     ) {
        //       // console.log("firstelemtHeight", firstelemtHeight);
        //       const lastElement = nextPage.elements.shift();

        //       if (lastElement) {
        //         currentPage.elements.push(lastElement);
        //         flag = true;
        //       }
        //     }
        //   }
        // }
        while (
          currentPageHeight <= PAGE_HEIGT &&
          currentPageIndex + 1 < updatedPages.length
        ) {
          currentPageIndex++;
          const nextPage = updatedPages[i + 1];
          const nextPageDom = pageDomRefs[i + 1];
          if (nextPageDom) {
            console.log("entro2");
            const firstElementNextPageDom = nextPageDom.getElementsByClassName(
              "element"
            )[0].firstChild as HTMLElement;
            const firstelemtHeight =
              firstElementNextPageDom?.getBoundingClientRect().height;
            console.log("firstElementNextPageDom", firstElementNextPageDom);
            console.log("firstelemtHeight", firstelemtHeight);
            if (
              firstElementNextPageDom &&
              currentPageHeight + firstelemtHeight <= PAGE_HEIGT
            ) {
              const lastElement = nextPage.elements.shift();

              if (lastElement) {
                currentPage.elements.push(lastElement);
                flag = true;
              }
            }
          }
        }
        //
      }

      // Calcular la altura actual de la página sumando las alturas de los elementos
      // currentPageHeight = currentPage.elements.reduce(
      //   (acc: number, el: ElementType) => acc + el.height,
      //   0
      // );
    }
    // console.log("terminar", updatedPages);
    if (flag) {
      // const updatedPages1 = removeEmptyLastPage(updatedPages);
      setPages(removeEmptyLastPage(updatedPages));
    }
    //   let currentPageIndex = 0;
    // setPages((prevPages) => {
    //   const updatedPages = [...prevPages];
    //   let currentPageIndex = 0;

    //   // Recorrer todas las páginas y reajustar los elementos en caso de ser necesario
    //   for (let i = 0; i < updatedPages.length; i++) {
    //     let currentPageHeight = 0;
    //     const currentPage = updatedPages[i];

    //     // Calcular la altura actual de la página sumando las alturas de los elementos
    //     currentPageHeight = currentPage.elements.reduce(
    //       (acc: number, el: ElementType) => acc + el.height,
    //       0
    //     );

    //     // Mover los elementos a la página anterior si es posible
    //     while (currentPageHeight > PAGE_HEIGT && currentPageIndex > 0) {
    //       currentPageIndex -= 1;
    //       const previousPage = updatedPages[currentPageIndex];

    //       // Obtener el último elemento de la página anterior y eliminarlo
    //       const lastElement = currentPage.elements.pop();
    //       if (lastElement) {
    //         currentPageHeight -= lastElement.height;
    //         previousPage.elements.push(lastElement);
    //       }
    //     }

    //     // while (currentPageHeight > PAGE_HEIGT && i + 1 < updatedPages.length) {
    //     //   const nextPage = updatedPages[i + 1];
    //     //   const lastElement = currentPage.elements.pop();

    //     //   if (lastElement) {
    //     //     nextPage.elements.unshift(lastElement);
    //     //     currentPageHeight -= lastElement.height;
    //     //   }
    //     // }
    //   }

    //   return updatedPages;
    // });
  };

  function removeEmptyLastPage(pages: Page[]) {
    console.log("pagesup", pages);
    const lastPageIndex = pages.length - 1;
    const lastPage = pages[lastPageIndex];

    // Verificar si la última página está vacía (no tiene elementos)
    if (lastPage.elements.length === 0) {
      // Eliminar la última página de la matriz de páginas
      pages.pop();
    }
    return pages;
  }

  function renderSwitchComponent(type: string, data: InfoComponent) {
    if (!data.display) return null;

    switch (type) {
      case "Employment":
        return <Employment data={data} />;
      case "Education":
        return <Education data={data} />;
      case "KeySkills":
        return <Skills data={data} />;
      case "Libre":
        return <Default data={data} />;
      default:
        return null;
    }
  }
  return (
    <>
      {pages.map((page, index) => (
        <div
          ref={(el) => (pageRefs.current[index] = el)}
          key={page.id}
          className="min-h-[1094px] h-full shadow-3xl mr-5 -px-10 -py-10 bg-white page grid grid-cols-6 break-words"
        >
          <aside className="flex flex-col items-center gap-1 px-2 py-6 text-white bg-green-700 box col-span-2">
            {page.elements.map((inf, index) => (
              <div className="w-full" key={index}>
                {inf.type === "Profile" && <Profile data={inf} />}
                {inf.type === "Contact" && <Contact data={inf} />}
              </div>
            ))}
          </aside>
          <main className="flex flex-col px-8 py-6 whitespace-pre-line text-black bg-white element col-span-4 h-min">
            {page.elements.map((inf, index) => (
              <div key={index}>{renderSwitchComponent(inf.type, inf)}</div>
            ))}
          </main>
        </div>
      ))}
    </>
  );
}

export default Viewer;
