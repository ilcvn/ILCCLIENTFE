import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";
import { Banner, Blogcard_1 } from "../../assets";
import BlogCard from "../../components/BlogCard";
import ContentSection from "../../components/ContentSection";
import CarouselBanner from "../../components/layouts/CarouselBanner";
import SliderMember from "../../components/MemberSlider";
import SliderCardsItem from "../../components/SliderCardsItem";
import SliderCounterparty from "../../components/SliderCounterparty";

function HomePage() {
  const { t } = useTranslation();

  const [isExpanded, setIsExpanded] = useState(false);

  const fullTextLogo = t("homepage.blogCard.content.paragraph6");

  const splitKeywords = ["Quả địa cầu", "The globe", "地球象征"];
  const splitPoint = splitKeywords.reduce((acc, keyword) => {
    const idx = fullTextLogo.indexOf(keyword);
    return idx !== -1 && (acc === -1 || idx < acc) ? idx : acc;
  }, -1);

  const introText = fullTextLogo.slice(0, splitPoint);
  const remainingText = fullTextLogo.slice(splitPoint);

  // t("homepage.blogCard.content.paragraph7") +
  // "\n" +
  // t("homepage.blogCard.content.paragraph8") +
  // "\n" +
  // t("homepage.blogCard.content.paragraph9");

  const toggleExpand = () => setIsExpanded((prev) => !prev);

  return (
    <div>
      <Helmet>
        <title>{t("nav.home")} | ILC</title>
      </Helmet>

      <CarouselBanner />

      <div className="py-4 invisible">=========SPACING============</div>

      <BlogCard
        imageUrl={Blogcard_1}
        title={t("homepage.blogCard.title")}
        subTitle={t("homepage.blogCard.subTitle")}
        content={
          <>
            <p className="text-justify">
              {t("homepage.blogCard.content.paragraph1")}
            </p>
            <br />

            {/* <p>{t("homepage.blogCard.content.paragraph2")}</p>
            <ul>
              <li>{t("homepage.blogCard.content.listItem1")}</li>
              <li>{t("homepage.blogCard.content.listItem2")}</li>
              <li>{t("homepage.blogCard.content.listItem3")}</li>
              <li>{t("homepage.blogCard.content.listItem4")}</li>
              <li>{t("homepage.blogCard.content.listItem5")}</li>
            </ul>
            <br />
            <p>{t("homepage.blogCard.content.paragraph3")}</p>
            <br /> */}
            <div className="flex items-center gap-3">
              <span>
                <b>{t("homepage.blogCard.content.tip1")}:</b>
              </span>
              <i>{t("homepage.blogCard.content.paragraph4")}</i>
            </div>

            <div className="flex items-center gap-3">
              <span className="whitespace-nowrap">
                <b>{t("homepage.blogCard.content.tip2")}:</b>
              </span>
              <i>{t("homepage.blogCard.content.paragraph5")}</i>
            </div>

            <br />

            <div className="">
              <span
                className={clsx(
                  "text-justify",
                  !isExpanded ? "text-gray-400" : "text-inherit",
                )}
              >
                {introText}
              </span>
              {!isExpanded && "... "}
              <AnimatePresence initial={false}>
                {isExpanded && (
                  <motion.span
                    key="content"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.6 }}
                    className="inline-block overflow-hidden text-black"
                  >
                    <p className="text-justify">{remainingText}</p>
                  </motion.span>
                )}

                {isExpanded && (
                  <motion.span
                    key="content"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.6 }}
                    className="inline-block overflow-hidden text-black"
                  >
                    <p className="text-justify">
                      {t("homepage.blogCard.content.paragraph7")}
                    </p>
                  </motion.span>
                )}

                {isExpanded && (
                  <motion.span
                    key="content"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.6 }}
                    className="inline-block overflow-hidden text-black"
                  >
                    <p className="text-justify">
                      {t("homepage.blogCard.content.paragraph8")}
                    </p>
                  </motion.span>
                )}

                {isExpanded && (
                  <motion.span
                    key="content"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.6 }}
                    className="inline-block overflow-hidden text-black"
                  >
                    <p className="text-justify">
                      {t("homepage.blogCard.content.paragraph9")}
                    </p>
                  </motion.span>
                )}
              </AnimatePresence>
            </div>
          </>
        }
        showBtn={true}
        btnContent={
          isExpanded
            ? t("homepage.blogCard.btnParagraphCollapse")
            : t("homepage.blogCard.btnParagraphSeeMore")
        }
        handleSeeMore={toggleExpand}
      />

      <div className="py-4 invisible">=========SPACING============</div>

      <ContentSection
        header={t("homepage.contentSection.services.header")}
        content={t("homepage.contentSection.services.content")}
      />

      <SliderCardsItem isCard={true} isPrevNextBtn={true} />

      <div className="px-4 lg:px-14 max-w-screen-2xl mx-auto py-16">
        <img
          src={Banner}
          alt="Banner"
          className="w-full h-auto max-h-[500px] object-cover rounded-2xl"
        />
      </div>

      <ContentSection
        header={t("homepage.contentSection.developers.header")}
        content={t("homepage.contentSection.developers.content")}
      />

      <SliderMember />

      <div className="py-4 invisible">=========SPACING============</div>

      {/* <ContentSection
        header={t("homepage.contentSection.knowledge.header")}
        content={t("homepage.contentSection.knowledge.content")}
      />

      <ILCKnowledgeSection /> */}

      <div className="py-4 invisible">=========SPACING============</div>

      <ContentSection
        header={t("homepage.contentSection.video.header")}
        content={t("homepage.contentSection.video.content")}
      />

      <SliderCardsItem isCardVideo={true} isPrevNextBtn={false} />

      <div className="py-4 invisible">=========SPACING============</div>

      <ContentSection
        header={t("homepage.contentSection.partners.header")}
        content={t("homepage.contentSection.partners.content")}
      />

      <SliderCounterparty />
    </div>
  );
}

export default HomePage;
