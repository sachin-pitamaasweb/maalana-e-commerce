import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { assets } from "../../assets/assets/assets"
import styles from "./DesktopHomeView.module.css"
import { motion } from "framer-motion"


const Home = () => {
    const navigate = useNavigate()
	// State to track if shatter is clicked
	const [isShatterClicked] = useState(false)

	// Function to handle click on shatter
	const handleShatterClick = () => {
		// setIsShatterClicked(true)
        navigate("/products")
        window.scrollTo(0, 0)
	}
	return (
		<div className={styles.container}>
			<div className={styles.topBanner}>
				<div className={styles.topBannerImg1}>
					<motion.img
						initial={{ x: -100, opacity: 0 }}
						whileInView={{ x: 0, opacity: 1 }}
						transition={{
							delay: 0.2,
							x: { type: "spring", stiffness: 60 },
							opacity: { duration: 0.8 },
							ease: "easeIn",
							duration: 0.8,
						}}
						src={assets.bannerText}
						alt=""
					/>
					<motion.img
						initial={{ scale: 0.5 }}
						whileInView={{ scale: 1 }}
						transition={{
							duration: 0.4,
						}}
						src={assets.sourLmli}
						alt=""
					/>
				</div>
			</div>

			<div className={styles.whiteBanner}>
				<div className={styles.whiteBannerImg1}>
					<img
						src={assets.bgWaveWhite}
						alt=""
					/>
				</div>
				<div className={styles.whiteBannerContent}>
					<motion.h2
						initial={{ x: -100, opacity: 0 }}
						whileInView={{ x: 0, opacity: 1 }}
						transition={{
							delay: 0.2,
							x: { type: "spring", stiffness: 60 },
							opacity: { duration: 0.8 },
							ease: "easeIn",
							duration: 0.8,
						}}
					>
						A Sweet and Sour Trip <br /> Down Memory Lane!
					</motion.h2>
					<div className={styles.whiteBannerContentimg}>
						<motion.img
							initial={{ scale: 0.5 }}
							whileInView={{ scale: 1 }}
							transition={{
								duration: 0.5,
							}}
							src={assets.sourFruit}
							alt=""
						/>
					</div>
				</div>
				<div className={styles.line1}>
					<img
						src={assets.line1}
						alt=""
					/>
				</div>
			</div>

			<div className={styles.yellowBanner}>
				<div className={styles.yellowBannerImg1}>
					<img
						src={assets.bgWaveYellow}
						alt=""
					/>
				</div>
				<div className={styles.yellowBannerContent}>
					<div className={styles.manogBoxImg}>
						<motion.img
							initial={{ scale: 0.5 }}
							whileInView={{ scale: 1 }}
							transition={{
								duration: 0.5,
							}}
							src={assets.mangoBox}
							alt=""
						/>
					</div>
					<motion.h2
						initial={{ y: 150, opacity: 0 }}
						whileInView={{ y: 0, opacity: 1 }}
						transition={{
							delay: 0.2,
							y: { type: "spring", stiffness: 60 },
							opacity: { duration: 0.8 },
							ease: "easeIn",
							duration: 0.8,
						}}
					>
						Mango Magic <br />
						in Every Katli!
					</motion.h2>
					<div className={styles.manogkid}>
						<motion.img
							initial={{ x: 100, opacity: 0 }}
							whileInView={{ x: 0, opacity: 1 }}
							transition={{
								delay: 0.2,
								x: { type: "spring", stiffness: 60 },
								opacity: { duration: 0.8 },
								ease: "easeIn",
								duration: 0.8,
							}}
							src={assets.mangoKid}
							alt=""
						/>
					</div>
				</div>

				<div className={styles.line2}>
					<img
						src={assets.line2}
						alt=""
					/>
				</div>
			</div>

			<div className={styles.purpleBanner}>
				<div className={styles.purpleBannerImg1}>
					<img
						src={assets.bgWavePurpule}
						alt=""
					/>
				</div>
				<div className={styles.purpleBannerContent}>
					<div className={styles.purpleBannerContentleft}>
						<motion.h2
							initial={{ x: -100, opacity: 0 }}
							whileInView={{ x: 0, opacity: 1 }}
							transition={{
								delay: 0.2,
								x: { type: "spring", stiffness: 60 },
								opacity: { duration: 0.8 },
								ease: "easeIn",
								duration: 0.8,
							}}
						>
							Jamun Flavor, <br /> Anytime Craving Savior!
						</motion.h2>
						<div className={styles.jamun}>
							<motion.img
								initial={{ scale: 0.5 }}
								whileInView={{ scale: 1 }}
								transition={{
									duration: 0.5,
								}}
								src={assets.jamun}
								alt=""
							/>
						</div>
					</div>
					<div className={styles.lollipop}>
						<motion.img
							initial={{ x: 100, opacity: 0 }}
							whileInView={{ x: 0, opacity: 1 }}
							transition={{
								delay: 0.2,
								x: { type: "spring", stiffness: 60 },
								opacity: { duration: 0.8 },
								ease: "easeIn",
								duration: 0.8,
							}}
							src={assets.lollipop}
							alt=""
						/>
					</div>
				</div>
				<div className={styles.line3}>
					<img
						src={assets.line3}
						alt=""
					/>
				</div>
			</div>

			<div className={styles.pinkBanner}>
				<div className={styles.pinkBannerImg1}>
					<img
						src={assets.bgWavePink}
						alt=""
					/>
				</div>
				<div className={styles.pinkBannerContent}>
					<div className={styles.candy1}>
						<motion.img
							initial={{ scale: 0.5 }}
							whileInView={{ scale: 1 }}
							transition={{
								duration: 0.5,
							}}
							src={assets.candies2}
							alt=""
						/>
					</div>
					<div className={styles.pinkBannerContentRight}>
						<div className={styles.mixfruits1}>
							<motion.img
								initial={{ scale: 0.5 }}
								whileInView={{ scale: 1 }}
								transition={{
									duration: 0.5,
								}}
								src={assets.mixfruits1}
								alt=""
							/>
						</div>
						<motion.h2
							initial={{ y: 100, opacity: 0 }}
							whileInView={{ y: 0, opacity: 1 }}
							transition={{
								delay: 0.2,
								y: { type: "spring", stiffness: 60 },
								opacity: { duration: 0.8 },
								ease: "easeIn",
								duration: 0.8,
							}}
						>
							Sweet, Tangy, <br /> and Totally Fun!
						</motion.h2>
					</div>
				</div>
				<div className={styles.line4}>
					<img
						src={assets.line4}
						alt=""
					/>
				</div>
			</div>

			<div className={styles.greenBanner}>
				<div className={styles.greenBannerImg1}>
					<img
						src={assets.bgWaveLightgreen}
						alt=""
					/>
				</div>
				<div className={styles.greenBannerContent}>
					<div className={styles.mixFruit2}>
						<motion.img
							initial={{ scale: 0.5 }}
							whileInView={{ scale: 1 }}
							transition={{
								duration: 0.5,
							}}
							src={assets.mixfruits2}
							alt=""
						/>
					</div>
					<motion.h2
						initial={{ y: 100, opacity: 0 }}
						whileInView={{ y: 0, opacity: 1 }}
						transition={{
							delay: 0.2,
							y: { type: "spring", stiffness: 60 },
							opacity: { duration: 0.8 },
							ease: "easeIn",
							duration: 0.8,
						}}
					>
						Assorted Flavors,
						<br /> Double the Fun!
					</motion.h2>
					<div className={styles.candies2}>
						<motion.img
							initial={{ scale: 0.5 }}
							whileInView={{ scale: 1 }}
							transition={{
								duration: 0.5,
							}}
							src={assets.candies1}
							alt=""
						/>
					</div>
				</div>
			</div>

			{/* <div className={styles.shatter}>
				<div className={styles.shatterImg}>
					<img
						src={assets.shatter}
						alt=""
					/>
					<div className={styles.roof}>
						<img
							src={assets.roof}
							alt=""
						/>
					</div>
				</div>
			</div>

			<HomeComponent /> */}
			<div className={styles.shatterContainer}>
				<div
					className={`${styles.shatter} ${isShatterClicked ? styles.shatterClicked : ""
						}`}
					onClick={handleShatterClick}
				>
					<div className={styles.shatterImg}>
						<img
							src={assets.shatter}
							alt=""
						/>
					</div>
				</div>
				<div className={styles.roof}>
					<img
						src={assets.roof}
						alt=""
					/>
				</div>
			</div>
		</div>
	)
}

export default Home
