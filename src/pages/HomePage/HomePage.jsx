import React from "react";
import { useNavigate } from "react-router-dom";
import BlogCard from "../../components/BlogCard";
import CarouselBanner from "../../components/layouts/CarouselBanner";
import { Banner, Blogcard_1 } from "../../assets";
import ContentSection from "../../components/ContentSection";
import ILCKnowledgeSection from "../../components/KnowledgeSection/ILCKnowledgeSection";
import SliderCardsItem from "../../components/SliderCardsItem";
import SliderCounterparty from "../../components/SliderCounterparty";
import { useTranslation } from "react-i18next";
import EcoSystem from "../../components/Ecosystem";
import SliderMember from "../../components/MemberSlider";
import { Helmet } from "react-helmet";
import ShareButton from "../../components/layouts/ShareButton";

function HomePage() {
  const { t } = useTranslation();

  return (
    <div>
      <Helmet>
        <title>{t("nav.home")} | ILC</title>
      </Helmet>

      <CarouselBanner />

      <div className="py-4 invisible">=========SPACING============</div>

      <BlogCard
        path={"https://www.facebook.com/profile.php?id=61573840948225"}
        imageUrl={Blogcard_1}
        title={t("homepage.blogCard.title")}
        subTitle={t("homepage.blogCard.subTitle")}
        content={
          <>
            <p className="text-justify">{t("homepage.blogCard.content.paragraph1")}</p>
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
            <div className="flex items-center gap-2">
              <span><b>{t("homepage.blogCard.content.tip1")}:</b></span>
              <i>{t("homepage.blogCard.content.paragraph4")}</i>
            </div>

            <div className="flex items-center gap-2">
              <span><b>{t("homepage.blogCard.content.tip2")}:</b></span>
              <i>{t("homepage.blogCard.content.paragraph5")}</i>
            </div>
          </>
        }
        showBtn={true}
        btnContent={t("homepage.blogCard.btnContent")}
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
          className="w-full h-auto max-h-[500px] object-cover rounded-md"
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
