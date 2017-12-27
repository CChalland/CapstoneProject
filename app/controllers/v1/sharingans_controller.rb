class V1::SharingansController < ApplicationController

  def index
    if params[:session_emotions]
      emotions = []
      faces = Face.where({session: params[:session_emotions]})
      # faces = Face.where({session: params[:session_emotions], user_id: current_user.id})
      faces.each do |face|
        emotions << face.visual_prowess
      end
      sharingan = emotions.select { |emotion| emotion != nil }

    elsif params[:admin]
      emotions = VisualProwess.all.order(id: :desc)
    end
    render json: emotions.as_json
  end

  def create
    @sharingan = Sharingan.new(
      right_0: params[:right_0],
      right_1: params[:right_1],
      right_2: params[:right_2],
      right_3: params[:right_3],
      right_4: params[:right_4],
      right_5: params[:right_5],
      right_6: params[:right_6],
      right_7: params[:right_7],
      middle_8: params[:middle_8],
      left_9: params[:left_9],
      left_10: params[:left_10],
      left_11: params[:left_11],
      left_12: params[:left_12],
      left_13: params[:left_13],
      left_14: params[:left_14],
      left_15: params[:left_15],
      left_16: params[:left_16],
      right_17: params[:right_17],
      right_18: params[:right_18],
      right_19: params[:right_19],
      right_20: params[:right_20],
      right_21: params[:right_21],
      left_22: params[:left_22],
      left_23: params[:left_23],
      left_24: params[:left_24],
      left_25: params[:left_25],
      left_26: params[:left_26],
      middle_27: params[:middle_27],
      middle_28: params[:middle_28],
      middle_29: params[:middle_29],
      middle_30: params[:middle_30],
      middle_31: params[:middle_31],
      middle_32: params[:middle_32],
      middle_33: params[:middle_33],
      middle_34: params[:middle_34],
      middle_35: params[:middle_35],
      right_36: params[:right_36],
      right_37: params[:right_37],
      right_38: params[:right_38],
      right_39: params[:right_39],
      right_40: params[:right_40],
      right_41: params[:right_41],
      left_42: params[:left_42],
      left_43: params[:left_43],
      left_44: params[:left_44],
      left_45: params[:left_45],
      left_46: params[:left_46],
      left_47: params[:left_47],
      middle_48: params[:middle_48],
      middle_49: params[:middle_49],
      middle_50: params[:middle_50],
      middle_51: params[:middle_51],
      middle_52: params[:middle_52],
      middle_53: params[:middle_53],
      middle_54: params[:middle_54],
      middle_55: params[:middle_55],
      middle_56: params[:middle_56],
      middle_57: params[:middle_57],
      middle_58: params[:middle_58],
      middle_59: params[:middle_59],
      middle_60: params[:middle_60],
      middle_61: params[:middle_61],
      middle_62: params[:middle_62],
      middle_63: params[:middle_63],
      middle_64: params[:middle_64],
      middle_65: params[:middle_65],
      middle_66: params[:middle_66],
      middle_67: params[:middle_67]
    )
    @sharingan.save

    if @sharingan.save
      @visual_prowess = VisualProwess.new(
        anger: params[:anger],
        contempt: params[:contempt],
        disgust: params[:disgust],
        fear: params[:fear],
        happiness: params[:happiness],
        neutral: params[:neutral],
        sadness: params[:sadness],
        surprise: params[:surprise]
      )
      @visual_prowess.save
    end

    if @sharingan && @visual_prowess.save
      @record = Record.new(
        image: params[:image]
      )
      @record.save
    end

    if @sharingan && @visual_prowess.save && @record.save
      @face = Face.new(
        left_px: params[:leftPx],
        top_px: params[:topPx],
        width_px: params[:widthPx],
        height_px: params[:heightPx],
        visual_prowess_id: VisualProwess.last.id,
        sharingan_id: Sharingan.last.id,
        # user_id: current_user.id,
        record_id: Record.last.id,
        session: params[:session].to_i
      )
      @face.save
    end
    render json: response.body
  end

  def show
    sharingan = Sharingan.find_by(id: params[:id].to_i)
    render json: sharingan.as_json
  end

  def update
    sharingan = Sharingan.find_by(id: params[:id].to_i)
    sharingan.right_0 = params[:right_0] || sharingan.right_0
    sharingan.right_1 = params[:right_1] || sharingan.right_1
    sharingan.right_2 = params[:right_2] || sharingan.right_2
    sharingan.right_3 = params[:right_3] || sharingan.right_3
    sharingan.right_4 = params[:right_4] || sharingan.right_4
    sharingan.right_5 = params[:right_5] || sharingan.right_5
    sharingan.right_6 = params[:right_6] || sharingan.right_6
    sharingan.right_7 = params[:right_7] || sharingan.right_7
    sharingan.middle_8 = params[:middle_8] || sharingan.middle_8 
    sharingan.left_9 = params[:left_9] || sharingan.left_9
    sharingan.left_10 = params[:left_10] || sharingan.left_10
    sharingan.left_11 = params[:left_11] || sharingan.left_11
    sharingan.left_12 = params[:left_12] || sharingan.left_12
    sharingan.left_13 = params[:left_13] || sharingan.left_13
    sharingan.left_14 = params[:left_14] || sharingan.left_14
    sharingan.left_15 = params[:left_15] || sharingan.left_15
    sharingan.left_16 = params[:left_16] || sharingan.left_16
    sharingan.right_17 = params[:right_17] || sharingan.right_17
    sharingan.right_18 = params[:right_18] || sharingan.right_18
    sharingan.right_19 = params[:right_19] || sharingan.right_19
    sharingan.right_20 = params[:right_20] || sharingan.right_20
    sharingan.right_21 = params[:right_21] || sharingan.right_21
    sharingan.left_22 = params[:left_22] || sharingan.left_22
    sharingan.left_23 = params[:left_23] || sharingan.left_23
    sharingan.left_24 = params[:left_24] || sharingan.left_24
    sharingan.left_25 = params[:left_25] || sharingan.left_25
    sharingan.left_26 = params[:left_26] || sharingan.left_26
    sharingan.middle_27 = params[:middle_27] || sharingan.middle_27
    sharingan.middle_28 = params[:middle_28] || sharingan.middle_28
    sharingan.middle_29 = params[:middle_29] || sharingan.middle_29
    sharingan.middle_30 = params[:middle_30] || sharingan.middle_30
    sharingan.middle_31 = params[:middle_31] || sharingan.middle_31
    sharingan.middle_32 = params[:middle_32] || sharingan.middle_32
    sharingan.middle_33 = params[:middle_33] || sharingan.middle_33
    sharingan.middle_34 = params[:middle_34] || sharingan.middle_34
    sharingan.middle_35 = params[:middle_35] || sharingan.middle_35
    sharingan.right_36 = params[:right_36] || sharingan.right_36
    sharingan.right_37 = params[:right_37] || sharingan.right_37
    sharingan.right_38 = params[:right_38] || sharingan.right_38
    sharingan.right_39 = params[:right_39] || sharingan.right_39
    sharingan.right_40 = params[:right_40] || sharingan.right_40
    sharingan.right_41 = params[:right_41] || sharingan.right_41
    sharingan.left_42 = params[:left_42] || sharingan.left_42
    sharingan.left_43 = params[:left_43] || sharingan.left_43
    sharingan.left_44 = params[:left_44] || sharingan.left_44
    sharingan.left_45 = params[:left_45] || sharingan.left_45
    sharingan.left_46 = params[:left_46] || sharingan.left_46
    sharingan.left_47 = params[:left_47] || sharingan.left_47
    sharingan.middle_48 = params[:middle_48] || sharingan.middle_48
    sharingan.middle_49 = params[:middle_49] || sharingan.middle_49
    sharingan.middle_50 = params[:middle_50] || sharingan.middle_50
    sharingan.middle_51 = params[:middle_51] || sharingan.middle_51
    sharingan.middle_52 = params[:middle_52] || sharingan.middle_52
    sharingan.middle_53 = params[:middle_53] || sharingan.middle_53
    sharingan.middle_54 = params[:middle_54] || sharingan.middle_54
    sharingan.middle_55 = params[:middle_55] || sharingan.middle_55
    sharingan.middle_56 = params[:middle_56] || sharingan.middle_56
    sharingan.middle_57 = params[:middle_57] || sharingan.middle_57
    sharingan.middle_58 = params[:middle_58] || sharingan.middle_58
    sharingan.middle_59 = params[:middle_59] || sharingan.middle_59
    sharingan.middle_60 = params[:middle_60] || sharingan.middle_60
    sharingan.middle_61 = params[:middle_61] || sharingan.middle_61
    sharingan.middle_62 = params[:middle_62] || sharingan.middle_62
    sharingan.middle_63 = params[:middle_63] || sharingan.middle_63
    sharingan.middle_64 = params[:middle_64] || sharingan.middle_64
    sharingan.middle_65 = params[:middle_65] || sharingan.middle_65
    sharingan.middle_66 = params[:middle_66] || sharingan.middle_66
    sharingan.middle_67 = params[:middle_67] || sharingan.middle_67
    if sharingan.save
      render json: sharingan.as_json
    else
      render json: {errors: sharingan.errors.full_messages}, status: :bad_request
    end
  end

  def destroy
    @@sharingan.destroy
  end
end
