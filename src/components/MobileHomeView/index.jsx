import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { assets } from "../../assets/assets/assets"
import styles from "./MobileHomeView.module.css"
import { motion } from "framer-motion"

const MobileHomeView = () => {
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
					<div className={styles.textBanner}>
						<motion.img
							initial={{ scale: 0.7 }}
							whileInView={{ scale: 1 }}
							transition={{
								duration: 0.5,
							}}
							src={assets.bannerText}
							alt=""
						/>
					</div>
					<div className={styles.sourLmli}>
						<motion.img
							initial={{ scale: 0.7 }}
							whileInView={{ scale: 1 }}
							transition={{
								duration: 0.5,
							}}
							src={assets.sourLmli}
							alt=""
						/>
					</div>
				</div>
			</div>

			<div className={styles.whiteBanner}>
				<div className={styles.whiteBannerImg}>
					<img
						src={assets.mediaBgWhite}
						alt=""
					/>
				</div>
				<div className={styles.whiteBannerContent}>
					<motion.h2
						initial={{ x: -50, opacity: 0 }}
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
					<div className={styles.sourFruit}>
						<motion.img
							initial={{ scale: 0.7 }}
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
						src={assets.mediaLine1}
						alt=""
					/>
				</div>
			</div>

			<div className={styles.yellowBanner}>
				<div className={styles.yellowBannerImg}>
					<img
						src={assets.mediaBgYellow}
						alt=""
					/>
				</div>
				<div className={styles.yellowBannerContainer}>
					<div className={styles.mangoBox}>
						<motion.img
							initial={{ scale: 0.7 }}
							whileInView={{ scale: 1 }}
							transition={{
								duration: 0.5,
							}}
							src={assets.mangoBox}
							alt=""
						/>
					</div>
					<motion.h2
						initial={{ x: 50, opacity: 0 }}
						whileInView={{ x: 0, opacity: 1 }}
						transition={{
							delay: 0.2,
							x: { type: "spring", stiffness: 60 },
							opacity: { duration: 0.8 },
							ease: "easeIn",
							duration: 0.8,
						}}
					>
						Mango Magic <br />
						in Every Katli!
					</motion.h2>
					<div className={styles.mangoKid}>
						<motion.img
							initial={{ x: 50, opacity: 0 }}
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
						src={assets.mediaLine2}
						alt=""
					/>
				</div>
			</div>

			<div className={styles.purpleBanner}>
				<div className={styles.purpleBannerImg}>
					<img
						src={assets.mediaBgPurple}
						alt=""
					/>
				</div>
				<div className={styles.purpleBannerContainer}>
					<div className={styles.purpleBannerLeft}>
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
						<motion.h2
							initial={{ x: -50, opacity: 0 }}
							whileInView={{ x: 0, opacity: 1 }}
							transition={{
								delay: 0.2,
								x: { type: "spring", stiffness: 60 },
								opacity: { duration: 0.8 },
								ease: "easeIn",
								duration: 0.8,
							}}
						>
							Jamun Flavor, <br />
							Anytime Craving Savior!
						</motion.h2>
					</div>
					<div className={styles.lollipop}>
						<motion.img
							initial={{ x: 50 }}
							whileInView={{ x: 0 }}
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
						src={assets.mediaLine3}
						alt=""
					/>
				</div>
			</div>

			<div className={styles.pinkBanner}>
				<div className={styles.pinkBannerImg}>
					<img
						src={assets.mediaBgPink}
						alt=""
					/>
				</div>
				<div className={styles.pinkBannerContainer}>
					<div className={styles.pinkBannerLeft}>
						<div className={styles.candy1}>
							<motion.img
								initial={{ x: -50 }}
								whileInView={{ x: 0 }}
								transition={{
									delay: 0.2,
									x: { type: "spring", stiffness: 60 },
									opacity: { duration: 0.8 },
									ease: "easeIn",
									duration: 0.8,
								}}
								src={assets.candies2}
								alt=""
							/>
						</div>
						<motion.h2
							initial={{ x: 50, opacity: 0 }}
							whileInView={{ x: 0, opacity: 1 }}
							transition={{
								delay: 0.2,
								x: { type: "spring", stiffness: 60 },
								opacity: { duration: 0.8 },
								ease: "easeIn",
								duration: 0.8,
							}}
						>
							Sweet, Tangy, <br /> and Totally Fun!
						</motion.h2>
					</div>
					<div className={styles.mixedFruit}>
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
				</div>
				<div className={styles.line4}>
					<img
						src={assets.mediaLine4}
						alt=""
					/>
				</div>
			</div>

			<div className={styles.greenBanner}>
				<div className={styles.greenBannerImg}>
					<img
						src={assets.mediaBgGreen}
						alt=""
					/>
				</div>
				<div className={styles.greenBannerContainer}>
					{/* <div className={styles.greenBannerLeft}> */}
					<div className={styles.mixedFruit2}>
						<motion.img
							initial={{ scale: 1.3 }}
							whileInView={{ scale: 1 }}
							transition={{
								duration: 0.5,
							}}
							src={assets.mixfruits2}
							alt=""
						/>
					</div>
					<div className={styles.candy2}>
						<motion.img
							initial={{ scale: 0.6 }}
							whileInView={{ scale: 1 }}
							transition={{
								duration: 0.5,
							}}
							src={assets.candies1}
							alt=""
						/>
					</div>
					{/* </div> */}
					<motion.h2
						initial={{ scale: 0.5 }}
						whileInView={{ scale: 1 }}
						transition={{
							duration: 0.5,
						}}
					>
						Assorted Flavors,
						<br /> Double the Fun!
					</motion.h2>
				</div>
			</div>

			<div className={styles.shatterContainer}>
				<div
					className={`${styles.shatter} ${
						isShatterClicked ? styles.shatterClicked : ""
					}`}
					onClick={handleShatterClick}
				>
					<div className={styles.shatterImg}>
						<img
							src={assets.mediaShatter}
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

export default MobileHomeView
